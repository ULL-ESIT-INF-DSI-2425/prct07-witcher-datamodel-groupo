import { db } from "../db/db.js";
import { Good } from "../models/good.js";
import { Merchant } from "../models/merchant.js";
import { Client } from "../models/client.js";

/**
 * ------------------------- BIENES -------------------------
 */

/**
 * Add a new good to the inventory
 * @param good - The good we want to add in the invetory
 */
export async function addGood(good: Good): Promise<void> {
  db.data?.goods.push(good);
  await db.write();
}

/**
 * Remove a good by its ID
 * @param id - The identificator of the good we want to remove of the inventory
 */
export async function removeGood(id: number): Promise<void> {
  db.data!.goods = db.data!.goods.filter((good) => good.id !== id);
  await db.write();
}

/**
 * Update a good by its ID
 * @param id - The identificator of the good 
 * @param updatedGood - The good we want to update in the inventory
 */
export async function updateGood(id: number, updatedGood: Partial<Good>) : Promise<void> {
  const index = db.data!.goods.findIndex((good) => good.id === id);
  if (index !== -1) {
    db.data!.goods[index] = { ...db.data!.goods[index], ...updatedGood };
    await db.write();
  }
}

/**
 * Search goods by name, material, or description
 * @param query - The argument to search in the inventory
 */
export async function searchGoods(query: string): Promise<Good[]> {
  return db.data!.goods.filter(
    (good) =>
      good.name.toLowerCase().includes(query.toLowerCase()) ||
      good.material.toLowerCase().includes(query.toLowerCase()) ||
      good.description.toLowerCase().includes(query.toLowerCase())
  );
}

/**
 * Sort goods by name or value (ascending or descending)
 * @param by - The filter to order by name or value
 * @param order - The order we want to use: ascendent or descendent
 */
export async function sortGoods(by: "name" | "value", order: "asc" | "desc"): Promise<Good[]> {
  return [...db.data!.goods].sort((a, b) => {
    const valueA = by === "name" ? a.name.toLowerCase() : a.value;
    const valueB = by === "name" ? b.name.toLowerCase() : b.value;

    return order === "asc" ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1;
  });
}

/**
 * ------------------------- MERCADERES -------------------------
 */

/**
 * Add a new merchant to the system
 * @param merchant - The merchant we want to add in the inventory
 */
export async function addMerchant(merchant: Merchant) {
  db.data?.merchants.push(merchant);
  await db.write();
}

/**
 * Remove a merchant by their ID
 * @param id - The identificator of the merchant we want to remove of the inventory
 */
export async function removeMerchant(id: number) {
  db.data!.merchants = db.data!.merchants.filter((merchant) => merchant.id !== id);
  await db.write();
}

/**
 * Update a merchant by their ID
 * @param id - The identificator of the merchant 
 * @param updatedMerchant - The merchant we want to update in the inventory
 */
export async function updateMerchant(id: number, updatedMerchant: Partial<Merchant>) {
  const index = db.data!.merchants.findIndex((merchant) => merchant.id === id);
  if (index !== -1) {
    db.data!.merchants[index] = { ...db.data!.merchants[index], ...updatedMerchant };
    await db.write();
  }
}

/**
 * Search merchants by name, type, or location
 * @param query - The argument to search in the inventory
 */
export async function searchMerchants(query: string) {
  return db.data!.merchants.filter(
    (merchant) =>
      merchant.name.toLowerCase().includes(query.toLowerCase()) ||
      merchant.type.toLowerCase().includes(query.toLowerCase()) ||
      merchant.location.toLowerCase().includes(query.toLowerCase())
  );
}

/**
 * Sort merchants by name or value (ascending or descending)
 * @param by - The filter to order by name or value
 * @param order - The order we want to use: ascendent or descendent
 */
export async function sortMerchants(by: "name" | "type", order: "asc" | "desc") {
  return [...db.data!.merchants].sort((a, b) => {
    const valueA = by === "name" ? a.name.toLowerCase() : a.type.toLowerCase();
    const valueB = by === "name" ? b.name.toLowerCase() : b.type.toLowerCase();

    return order === "asc" ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1;
  });
}

/**
 * ------------------------- CLIENTES -------------------------
 */

/**
 * Add a new client to the system
 * @param client - The client we want to add in the inventory
 */
export async function addClient(client: Client) {
  db.data?.customers.push(client);
  await db.write();
}

/**
 * Remove a client by their ID
 * @param id - The identificator of the client we want to remove in the inventory
 */
export async function removeClient(id: number) {
  db.data!.customers = db.data!.customers.filter((client) => client.id !== id);
  await db.write();
}

/**
 * Update a client by their ID
 * @param id - The identificator of the client 
 * @param updatedMerchant - The client we want to update in the inventory
 */
export async function updateClient(id: number, updatedClient: Partial<Client>) {
  const index = db.data!.customers.findIndex((client) => client.id === id);
  if (index !== -1) {
    db.data!.customers[index] = { ...db.data!.customers[index], ...updatedClient };
    await db.write();
  }
}

/**
 * Search clients by name, race, or location
 * @param query - The argument to search in the inventory
 */
export async function searchClients(query: string) {
  return db.data!.customers.filter(
    (client) =>
      client.name.toLowerCase().includes(query.toLowerCase()) ||
      client.race.toLowerCase().includes(query.toLowerCase()) ||
      client.location.toLowerCase().includes(query.toLowerCase())
  );
}

/**
 * Sort clients by name or race (ascending or descending)
 * @param by - The filter to order by name or value
 * @param order - The order we want to use: ascendent or descendent
 */
export async function sortClients(by: "name" | "race", order: "asc" | "desc") {
  return [...db.data!.customers].sort((a, b) => {
    const valueA = by === "name" ? a.name.toLowerCase() : a.race.toLowerCase();
    const valueB = by === "name" ? b.name.toLowerCase() : b.race.toLowerCase();

    return order === "asc" ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1;
  });
}

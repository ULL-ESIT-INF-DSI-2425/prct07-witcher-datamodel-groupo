// import { db } from "../db/db.js";
// import { Good } from "../models/good.js";
// import { Merchant } from "../models/merchant.js";
// import { Client } from "../models/client.js";

// /**
//  * ------------------------- BIENES -------------------------
//  */

// /**
//  * Add a new good to the inventory
//  * @param good - The good we want to add in the invetory
//  */
// export async function addGood(good: Good): Promise<void> {
//   db.data?.goods.push(good);
//   await db.write();
// }

// /**
//  * Remove a good by its ID
//  * @param id - The identificator of the good we want to remove of the inventory
//  */
// export async function removeGood(id: number): Promise<void> {
//   db.data!.goods = db.data!.goods.filter((good) => good.id !== id);
//   await db.write();
// }

// /**
//  * Update a good by its ID
//  * @param id - The identificator of the good 
//  * @param updatedGood - The good we want to update in the inventory
//  */
// export async function updateGood(id: number, updatedGood: Partial<Good>) : Promise<void> {
//   const index = db.data!.goods.findIndex((good) => good.id === id);
//   if (index !== -1) {
//     db.data!.goods[index] = { ...db.data!.goods[index], ...updatedGood };
//     await db.write();
//   }
// }

// /**
//  * Search goods by name, material, or description
//  * @param query - The argument to search in the inventory
//  */
// export async function searchGoods(query: string): Promise<Good[]> {
//   return db.data!.goods.filter(
//     (good) =>
//       good.name.toLowerCase().includes(query.toLowerCase()) ||
//       good.material.toLowerCase().includes(query.toLowerCase()) ||
//       good.description.toLowerCase().includes(query.toLowerCase())
//   );
// }

// /**
//  * Sort goods by name or value (ascending or descending)
//  * @param by - The filter to order by name or value
//  * @param order - The order we want to use: ascendent or descendent
//  */
// export async function sortGoods(by: "name" | "value", order: "asc" | "desc"): Promise<Good[]> {
//   return [...db.data!.goods].sort((a, b) => {
//     const valueA = by === "name" ? a.name.toLowerCase() : a.value;
//     const valueB = by === "name" ? b.name.toLowerCase() : b.value;

//     return order === "asc" ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1;
//   });
// }

// /**
//  * ------------------------- MERCADERES -------------------------
//  */

// /**
//  * Add a new merchant to the system
//  * @param merchant - The merchant we want to add in the inventory
//  */
// export async function addMerchant(merchant: Merchant) {
//   db.data?.merchants.push(merchant);
//   await db.write();
// }

// /**
//  * Remove a merchant by their ID
//  * @param id - The identificator of the merchant we want to remove of the inventory
//  */
// export async function removeMerchant(id: number) {
//   db.data!.merchants = db.data!.merchants.filter((merchant) => merchant.id !== id);
//   await db.write();
// }

// /**
//  * Update a merchant by their ID
//  * @param id - The identificator of the merchant 
//  * @param updatedMerchant - The merchant we want to update in the inventory
//  */
// export async function updateMerchant(id: number, updatedMerchant: Partial<Merchant>) {
//   const index = db.data!.merchants.findIndex((merchant) => merchant.id === id);
//   if (index !== -1) {
//     db.data!.merchants[index] = { ...db.data!.merchants[index], ...updatedMerchant };
//     await db.write();
//   }
// }

// /**
//  * Search merchants by name, type, or location
//  * @param query - The argument to search in the inventory
//  */
// export async function searchMerchants(query: string) {
//   return db.data!.merchants.filter(
//     (merchant) =>
//       merchant.name.toLowerCase().includes(query.toLowerCase()) ||
//       merchant.type.toLowerCase().includes(query.toLowerCase()) ||
//       merchant.location.toLowerCase().includes(query.toLowerCase())
//   );
// }

// /**
//  * Sort merchants by name or value (ascending or descending)
//  * @param by - The filter to order by name or value
//  * @param order - The order we want to use: ascendent or descendent
//  */
// export async function sortMerchants(by: "name" | "type", order: "asc" | "desc") {
//   return [...db.data!.merchants].sort((a, b) => {
//     const valueA = by === "name" ? a.name.toLowerCase() : a.type.toLowerCase();
//     const valueB = by === "name" ? b.name.toLowerCase() : b.type.toLowerCase();

//     return order === "asc" ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1;
//   });
// }

// /**
//  * ------------------------- CLIENTES -------------------------
//  */

// /**
//  * Add a new client to the system
//  * @param client - The client we want to add in the inventory
//  */
// export async function addClient(client: Client) {
//   db.data?.customers.push(client);
//   await db.write();
// }

// /**
//  * Remove a client by their ID
//  * @param id - The identificator of the client we want to remove in the inventory
//  */
// export async function removeClient(id: number) {
//   db.data!.customers = db.data!.customers.filter((client) => client.id !== id);
//   await db.write();
// }

// /**
//  * Update a client by their ID
//  * @param id - The identificator of the client 
//  * @param updatedMerchant - The client we want to update in the inventory
//  */
// export async function updateClient(id: number, updatedClient: Partial<Client>) {
//   const index = db.data!.customers.findIndex((client) => client.id === id);
//   if (index !== -1) {
//     db.data!.customers[index] = { ...db.data!.customers[index], ...updatedClient };
//     await db.write();
//   }
// }

// /**
//  * Search clients by name, race, or location
//  * @param query - The argument to search in the inventory
//  */
// export async function searchClients(query: string) {
//   return db.data!.customers.filter(
//     (client) =>
//       client.name.toLowerCase().includes(query.toLowerCase()) ||
//       client.race.toLowerCase().includes(query.toLowerCase()) ||
//       client.location.toLowerCase().includes(query.toLowerCase())
//   );
// }

// /**
//  * Sort clients by name or race (ascending or descending)
//  * @param by - The filter to order by name or value
//  * @param order - The order we want to use: ascendent or descendent
//  */
// export async function sortClients(by: "name" | "race", order: "asc" | "desc") {
//   return [...db.data!.customers].sort((a, b) => {
//     const valueA = by === "name" ? a.name.toLowerCase() : a.race.toLowerCase();
//     const valueB = by === "name" ? b.name.toLowerCase() : b.race.toLowerCase();

//     return order === "asc" ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1;
//   });
// }
import { DB_ROM } from "../db/db_class.js";
import { Good } from "../models/good.js";
import { Merchant } from "../models/merchant.js";
import { Client } from "../models/client.js";
// import { Materials } from "../enums/materials.js";
// import { MerchantType } from "../enums/merchantType.js";
// import { Locations } from "../enums/locations.js";

// clase que representa la base de datos con los métodos para interactuar con ella y llevar un control de los datos y contar el numero de items en la base de datos


/**
 * Represents an Inventory object
 * 
 * Class Inventory
 * @param db - database object to interact with the database
 * @param stock - stock of the inventory
 */
export class Inventory {

  private db: DB_ROM;
  private stock: Map<Good, number>;

  /**
   * The constructor of the Inventory class
   */
  constructor() {
    this.db = new DB_ROM();
    this.stock = new Map(); // mapa para llevar un control de los items en la base de datos
  }

  /**
   * Initialize the inventory database
   * @returns A promise with the initialization of the database
   */
  async initDB(): Promise<void> {
    await this.db.initDB();
  }

  /**
   * Get the database
   * @returns The database object
   */
  getDB(): DB_ROM {
    return this.db;
  }
  

  // Métodos
  /**
   * Add a new good to the inventory
   * @param good - The good we want to add in the invetory
   * @returns A promise with the addition of the good
   * @example
   * ```typescript
   * const good = new Good(1, "Espada", "Una espada de acero", Materials.Steel, 2, 10);
   * const inventory = new Inventory();
   * await inventory.initDB();
   * await inventory.addGood(good);
   * ```
   */
  async addGood(good: Good): Promise<void> {
    // this.db.data?.goods.push(good);
    // comprobar si el item ya existe en la base de datos
    this.db.db.data?.goods.push(good);
    await this.db.db.write();
    // meter el item en el stock
    this.stock.set(good, 1);
    // si ya existe, aumentar el stock
    this.stock.set(good, this.stock.get(good)! + 1);
  }
  /**
   * Add a new merchant to the system
   * @param merchant - The merchant we want to add in the inventory
   * @returns A promise with the addition of the merchant
   * @example
   * ```typescript
   * const merchant = new Merchant(1, "Geralt", MerchantType.Witcher, Locations.KaerMorhen);
   * const inventory = new Inventory();
   * await inventory.initDB();
   * await inventory.addMerchant(merchant);
   * ```
   */
  async addMerchant(merchant: Merchant): Promise<void> {
    
    this.db.db.data?.merchants.push(merchant);
    await this.db.db.write();
  }
  /**
   * Add a new client to the system
   * @param client - The client we want to add in the inventory
   * @returns A promise with the addition of the client
   * @example
   * ```typescript
   * const client = new Client(1, "Yennefer", "Sorceress", "Human");
   * const inventory = new Inventory();
   * await inventory.initDB();
   * await inventory.addClient(client);
   * ```
   */
  async addClient(client: Client): Promise<void> {
    this.db.db.data?.customers.push(client);
    await this.db.db.write();
  }

}

  
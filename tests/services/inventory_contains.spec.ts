import { describe, it, expect } from 'vitest';
import { DB_Inventory } from "../../src/db/db_inventory.ts";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { InventorySchema } from "../../src/types/inventoryschema.ts";
import { Good } from "../../src/models/good.ts";
import { Materials } from "../../src/enums/materials.ts";
import { Merchant } from "../../src/models/merchant.ts";
import { MerchantType } from "../../src/enums/merchantType.ts";
import { Client } from "../../src/models/client.ts";
import { Races } from "../../src/enums/races.ts";
import { Locations } from "../../src/enums/locations.ts";
import { InventoryStock } from "../../src/services/inventory_stock.ts";

describe ('Inventory test db', () => {
  const adaptader: JSONFile<InventorySchema> = new JSONFile<InventorySchema>('./src/db/db_inventory.json');
  const db: Low<InventorySchema> = new Low<InventorySchema>(adaptader, { goods: [], merchant: [], client: [] });
  const inventory = new DB_Inventory(adaptader, db);
  const inventoryStock = new InventoryStock(inventory);

  it ('should be defined', () => {
    expect(inventoryStock).toBeDefined();
  });

  it ('should have a method to initialize the database', async () => {
    await inventory.initDB();
    expect(inventory).toBeDefined();
    await inventoryStock.initDB();
    expect(inventoryStock).toBeDefined();
  });

  it ('should have a method to get the database', () => {
    expect(inventoryStock.getDB()).toBeDefined();
  });

  it ('should have a method to get the stock', () => {
    expect(inventoryStock.getStock()).toBeDefined();
  });

  it ('should have a method to add a good to the inventory', async () => {
    const good = new Good(1, 'Makaham Steel Sword', 'A sword made of the finest steel from Mahakam', Materials.MAKAHAM_STEEL, 3.5, 500);
    await inventoryStock.addGood(good);
    expect(inventoryStock.getStock().get(good)).toBeDefined();
    // test of incrementing the stock of the good
    await inventoryStock.addGood(good);
    await inventoryStock.addGood(good);
    expect(inventoryStock.getStock().get(good)).toBe(3);
  });

  it ('should have a method to add a Merchant to the inventory', async () => {
    const merchant = new Merchant(2, 'Yennefer', MerchantType.ALCHEMIST, Locations.KAER_MORHEN);    
    await inventoryStock.addMerchant(merchant);
    expect(inventoryStock.getDB().db.data?.merchant).toBeDefined();
    // usar some para comprobar si el merchant esta en la base de datos
    expect(inventoryStock.getDB().db.data?.merchant.some((m) => m.name === merchant.name)).toBe(true);
  });

  it ('should have a method to add a Client to the inventory', async () => {
    const client = new Client(3, 'Geralt', Races.WITCHER, Locations.KAER_MORHEN);
    await inventoryStock.addClient(client);
    expect(inventoryStock.getDB().db.data?.client).toBeDefined();
    // usar some para comprobar si el cliente esta en la base de datos
    expect(inventoryStock.getDB().db.data?.client.some((c) => c.name === client.name)).toBe(true);
  });

  it ('should have a method to remove a good from the inventory', async () => {
    const good = new Good(1, 'Makaham Steel Sword', 'A sword made of the finest steel from Mahakam', Materials.MAKAHAM_STEEL, 3.5, 500);
    await inventoryStock.addGood(good);
    await inventoryStock.addGood(good);
    await inventoryStock.removeGood(good);
    expect(inventoryStock.getStock().get(good)).toBe(1);
  });

  it ('should have a method to remove a Merchant from the inventory', async () => {
    const merchant = new Merchant(2, 'Yennefer', MerchantType.ALCHEMIST, Locations.KAER_MORHEN);    
    await inventoryStock.removeMerchant(merchant);
    expect(inventoryStock.getDB().db.data?.merchant.some((m) => m.name === merchant.name)).toBe(false);
  });

  it ('should have a method to remove a Client from the inventory', async () => {
    const client = new Client(3, 'Geralt', Races.WITCHER, Locations.KAER_MORHEN);
    await inventoryStock.removeClient(client);
    expect(inventoryStock.getDB().db.data?.client.some((c) => c.name === client.name)).toBe(false);
  });

  // it ('should return an empty stock when no goods are present', async () => {
  //   await inventory.initDB();
  //   await inventoryStock.initDB();
    
  //   const stock = await inventoryStock.checkGoodStock();
  //   expect(stock).toEqual([]); // La lista debe estar vacía
  // });
  
  // it ('should return the correct stock after adding goods', async () => {
  //   const good1 = new Good(1, 'Makaham Steel Sword', 'A fine steel sword', Materials.MAKAHAM_STEEL, 3.5, 500);
  //   const good2 = new Good(2, 'Elixir Golondrina', 'A powerful healing elixir', Materials.MAGIC_ESSENCE, 0.5, 150);
    
  //   await inventoryStock.addGood(good1);
  //   await inventoryStock.addGood(good1);
  //   await inventoryStock.addGood(good2);
  
  //   const stock = await inventoryStock.checkGoodStock();
    
  //   expect(stock).toEqual([
  //     { id: 1, name: 'Makaham Steel Sword', quantity: 2, value: 500 },
  //     { id: 2, name: 'Elixir Golondrina', quantity: 1, value: 150 }
  //   ]);
  // });
  
  // it ('should return the correct stock after removing goods', async () => {
  //   const good = new Good(1, 'Makaham Steel Sword', 'A fine steel sword', Materials.MAKAHAM_STEEL, 3.5, 500);
    
  //   await inventoryStock.addGood(good);
  //   await inventoryStock.addGood(good);
  //   await inventoryStock.removeGood(good);
  
  //   const stock = await inventoryStock.checkGoodStock();
  
  //   expect(stock).toEqual([
  //     { id: 1, name: 'Makaham Steel Sword', quantity: 1, value: 500 }
  //   ]);
  // });
  
});

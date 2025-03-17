import { describe, it, expect } from "vitest";
import { DB_Inventory } from "../../src/db/db_inventory.ts";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { InventorySchema } from "../../src/types/inventoryschema.ts";

describe('Inventory test', () => {
  it ('should be defined', () => {
    expect(DB_Inventory).toBeDefined();
  });
  it ('should create a new instance of DB_Inventory', () => {
    const adaptader: JSONFile<InventorySchema> = new JSONFile<InventorySchema>('./src/db/db_inventory.json');
    const db: Low<InventorySchema> = new Low<InventorySchema>(adaptader, { goods: [], merchant: [], client: [] });
    const inventory = new DB_Inventory(adaptader, db);
    expect(inventory).toBeDefined();
  });
  it ('should have a method to initialize the database', async () => {
    const adaptader: JSONFile<InventorySchema> = new JSONFile<InventorySchema>('./src/db/db_inventory.json');
    const db: Low<InventorySchema> = new Low<InventorySchema>(adaptader, { goods: [], merchant: [], client: [] });
    const inventory = new DB_Inventory(adaptader, db);
    await inventory.initDB();
    expect(inventory).toBeDefined();
  });
});

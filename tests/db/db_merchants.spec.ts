import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { MerchantSchema } from "../../src/types/merchantschema.js";
import { describe, it, expect } from "vitest";
import { DB_Merchant } from "../../src/db/db_merchants.js";
import { Merchant } from "../../src/models/merchant.js";
import { MerchantType } from "../../src/enums/merchantType.js";
import { Locations } from "../../src/enums/locations.js";
import { MerchantAlreadyExistsError } from "../../src/errors/merchantalreadyexists.js";
import { NotInInventoryError } from "../../src/errors/notininventoryerror.js";

describe("class DB_Merchant tests", () => {

  const adapter = new JSONFile<MerchantSchema>('./src/db/db_merchants.json');
  const db = new Low<MerchantSchema>(adapter, {merchant: []});
  const dbMerchants = new DB_Merchant(adapter, db);

  it('should be defined', () => {
    expect(dbMerchants).toBeDefined();
  });

  it('should have a property adapter', () => {
    expect(dbMerchants.adapter).toBeDefined();
  });

  it('should have a property db', () => {
    expect(dbMerchants.db).toBeDefined();
  });

  it('should have a property inventory', () => {
    expect(dbMerchants._inventory).toBeDefined();
  });

  it('should have a method to initialize the database', async () => {
    await dbMerchants.initDB();
    expect(dbMerchants).toBeDefined();
  });

  it('should have a method to read the inventory', async () => {
    await dbMerchants.readIventory();
    expect(dbMerchants).toBeDefined();
  });

  it('should have a method to write the inventory', async () => {
    await dbMerchants.writeInventory();
    expect(dbMerchants).toBeDefined();
  });

  it('should have a method to add a merchant', () => {
    let merchant = new Merchant(2, "Gremist", MerchantType.ALCHEMIST, Locations.SKELLIGE);
    dbMerchants.addMerchant(merchant);
    console.log("Estado del inventario tras añadir un comerciante:");
    console.log(dbMerchants._inventory);
    expect(dbMerchants._inventory.length).toBe(1);
    dbMerchants.writeInventory();
  });

  it('should dont add a new merchant in the inventory if the merchant already exists', () => {
    let merchant = new Merchant(2, "Gremist", MerchantType.ALCHEMIST, Locations.SKELLIGE);
    console.log("Estado del inventario tras añadir un comerciante ya existente:");
    console.log(dbMerchants._inventory);
    dbMerchants.addMerchant(merchant);
    expect(() => (dbMerchants.addMerchant(merchant))).toThrow(MerchantAlreadyExistsError);
  });

  it('should have a method to remove a merchant', () => {
    let merchant = new Merchant(2, "Gremist", MerchantType.ALCHEMIST, Locations.SKELLIGE);
    dbMerchants.addMerchant(merchant);
    console.log("Estado del inventario antes de eliminar un comerciante:");
    console.log(dbMerchants._inventory);
    dbMerchants.removeMerchant(merchant);
    console.log("Estado del inventario tras eliminar un comerciante:");
    console.log(dbMerchants._inventory);
    expect(dbMerchants._inventory.length).toBe(0);
    //dbMerchants.writeInventory();
  });

  it('should dont remove a merchant in the inventory if the merchant does not exist', () => {
    let merchant = new Merchant(2, "Gremist", MerchantType.ALCHEMIST, Locations.SKELLIGE);
    console.log("Estado del inventario antes de quitar el comerciante inexistente:");
    console.log(dbMerchants._inventory);
    expect(() => (dbMerchants.removeMerchant(merchant))).toThrow(NotInInventoryError);
  });
});
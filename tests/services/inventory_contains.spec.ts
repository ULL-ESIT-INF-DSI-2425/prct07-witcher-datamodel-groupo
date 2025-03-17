import { describe, expect, it } from "vitest";
import { InventoryContain } from "../../src/services/inventory_contain.js";
import { Good } from "../../src/models/good.js";
import { Materials } from "../../src/enums/materials.ts";
import { DB_Inventory } from "../../src/db/db_inventory.ts";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { InventorySchema } from "../../src/types/inventoryschema.ts";

// TODO: Implement tests for the InventoryContains class

describe('InventoryContain service initialize and methods', () => {
  it('Should be defined', () => {
    expect(InventoryContain).toBeDefined();
  });
  it('Should create a new instance of InventoryContain', () => {
    const 
  });
  it('Should have a method to check if the object is inside the inventory', () => {
    const inventory = new DB_Inventory();
    const good = new Good(1, 'Makaham Steel Sword', 'A sword made of the finest steel from Mahakam', Materials.MAKAHAM_STEEL, 3.5, 500);
    inventory.db.data.goods.push(good);
    const inventoryContain = new InventoryContain<Good>(inventory);
    expect(inventoryContain.checkContain(good)).toBe(true);
  });
  it('Should have a method to check if the object is not inside the inventory', () => {
    const inventory = new DB_Inventory();
    const merchant = new Merchant(2, 'Yennefer', MerchantType.ALCHEMIST, Locations.KAER_MORHEN);
    const inventoryContain = new InventoryContain<Merchant>(inventory);
    expect(inventoryContain.checkContain(merchant)).toBe(false);
  });
  it('Should have a method to check if the object is not inside the inventory', () => {
    const inventory = new DB_Inventory();
    const client = new Client(3, 'Geralt', Races.WITCHER, Locations.KAER_MORHEN);
    const inventoryContain = new InventoryContain<Client>(inventory);
    expect(inventoryContain.checkContain(client)).toBe(false);
  });
});
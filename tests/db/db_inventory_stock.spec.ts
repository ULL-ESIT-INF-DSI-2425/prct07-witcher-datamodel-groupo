import { describe, expect, it } from "vitest";
import { DB_Inventory } from "../../src/db/db_inventory.js";
import { InventoryStock } from "../../src/services/inventory_stock.js";
import { InventoryContain } from "../../src/services/inventory_contain.js";
import { InventorySchema } from "../../src/types/inventoryschema.js";
import { Good } from "../../src/models/good.js";
import { Materials } from "../../src/enums/materials.js";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

describe ("db_inventory_stock", () => {
  it ("should be defined", () => {
    expect(InventoryStock).toBeDefined();
  });
  it ("should be defined", () => {
    expect(InventoryContain).toBeDefined();
  })
  it("should create a new inventory", () => {
    let inventory = new InventoryStock();
    expect(inventory).toBeDefined();
  });
  it("should create a new DB_Inventory", () => {
    const adapter = new JSONFile<InventorySchema>("./src/db/db_inventory.json");
    const db = new Low<InventorySchema>(adapter, { goods: [] });

    const inventoryDB = new DB_Inventory(adapter, db);

    expect(inventoryDB).toBeDefined();
  });
  it ("should add a good to the inventory", () => {
    let inventory = new InventoryStock();
    let good = new Good(1, 'Makaham steel sword', 'example', Materials.MAKAHAM_STEEL, 3.5, 500);
    inventory.addGood(good);
    // use some method to check if the good is in the inventory
    expect(inventory.getDB().db.data.goods.some((g: Good) => g.id === good.id)).toBe(true);
  });
  it ("should remove a good from the inventory", () => {
    let inventory = new InventoryStock();
    let good = new Good(1, 'Makaham steel sword', 'example', Materials.MAKAHAM_STEEL, 3.5, 500);
    inventory.addGood(good);
    inventory.removeGood(good);
    // use some method to check if the good in the map has a quantity of 0)
    
  });


});
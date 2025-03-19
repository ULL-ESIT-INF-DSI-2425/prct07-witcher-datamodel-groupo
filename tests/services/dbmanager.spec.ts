import { describe, it, expect } from "vitest";
import { DBManager } from "../../src/services/dbmanager.js";
import { DB_Good } from "../../src/db/db_good.js";
import { Good } from "../../src/models/good.js";
import { Materials } from "../../src/enums/materials.js";
import { TakenIdError } from "../../src/errors/takeniderror.js";
import { NotInInventoryError } from "../../src/errors/notininventoryerror.js";

describe("class DBManager tests", () => {
  
  it("should create a new dbmanager instance", () => {
    const dbManager = new DBManager();
    expect(dbManager).toBeDefined();
  });

  it("should instanciate each attribute ", () => {
    const dbManager = new DBManager();
    expect(dbManager.getDBGood()).toBeInstanceOf(DB_Good);
    expect(dbManager._good_id).toStrictEqual([]);
  });

  it("should load good ids correctly", () => {
    const dbManager = new DBManager();
    dbManager.loadGoodId();
    expect(dbManager._good_id.length).toBe(0);
  });

});

describe("DBGoods methods", () => {

  it("should add a good to the inventory", () => {
    const dbManager = new DBManager();
    let good: Good = new Good(1, 'Espada', 'Una espada de acero', Materials.MAKAHAM_STEEL, 2, 10);
    let good2: Good = new Good(1, 'Palo', 'Un palo de madera', Materials.MAGIC_ESSENCE, 2, 10);
    dbManager.addGood(good);

    // check if the good is in the inventory
    dbManager.getDBGood().writeInventory();
    //console.log(dbManager.getDBGood()._inventory);
    expect(dbManager.getDBGood()._inventory.length).toBe(1);

    // add the same good again
    dbManager.addGood(good);
    dbManager.getDBGood().writeInventory();
    console.log(dbManager.getDBGood()._inventory);
    console.log("\n\n");
    expect(dbManager.getDBGood()._inventory.length).toBe(1);

    // if a good with the same id is added, it should throw an error
    expect(() => (dbManager.addGood(good2))).toThrow(TakenIdError);

  });

  it("should remove a good from the inventory", () => {
    const dbManager = new DBManager();
    let good: Good = new Good(1, 'Espada', 'Una espada de acero', Materials.MAKAHAM_STEEL, 2, 10);
    let good2: Good = new Good(2, 'Palo', 'Un palo de madera', Materials.MAGIC_ESSENCE, 2, 10);
    let good3: Good = new Good(3, 'Pocion', 'Una pocion simple', Materials.MAGIC_ESSENCE, 2, 10);


    // add the goods to the inventory
    dbManager.addGood(good);
    dbManager.addGood(good);
    dbManager.addGood(good2);
    //console.log(dbManager.getDBGood()._inventory);
    dbManager.getDBGood().writeInventory();
    // // console.log("\n\n");
    expect(dbManager.getDBGood()._inventory.length).toBe(2);
    

    // remove the first good (there are 2 in the inventory)
    dbManager.removeGood(good);
    expect(dbManager.getDBGood()._inventory.length).toBe(2);
    dbManager.getDBGood().writeInventory();
    // console.log(dbManager.getDBGood()._inventory);
    // console.log("\n\n");

    // remove the first good again (there are 1 in the inventory)
    dbManager.removeGood(good);
    expect(dbManager.getDBGood()._inventory.length).toBe(1);
    console.log(dbManager.getDBGood()._inventory);
    // console.log("\n\n");
    dbManager.getDBGood().writeInventory();

    expect(() => dbManager.removeGood(good3)).toThrow(NotInInventoryError);
  });

});

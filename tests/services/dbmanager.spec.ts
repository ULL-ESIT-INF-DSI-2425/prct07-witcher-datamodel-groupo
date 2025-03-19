import { describe, it, expect } from "vitest";
import { DBManager } from "../../src/services/dbmanager.js";
import { DB_Good } from "../../src/db/db_good.js";
import { Good } from "../../src/models/good.js";
import { Materials } from "../../src/enums/materials.js";
import { AppError } from "../../src/errors/apperror.js";

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

  it("should add a good to the inventory", () => {
    const dbManager = new DBManager();
    let good: Good = new Good(1, 'Espada', 'Una espada de acero', Materials.MAKAHAM_STEEL, 2, 10);
    let good2: Good = new Good(1, 'Palo', 'Un palo de madera', Materials.MAGIC_ESSENCE, 2, 10);
    dbManager.addGood(good);

    dbManager.getDBGood().writeInventory();
    // sacar por pantalla el inventario
    console.log(dbManager.getDBGood()._inventory);
    expect(dbManager.getDBGood()._inventory.length).toBe(1);
    // añadir de nuevo y comprobar si se incrementa la cantidad
    dbManager.addGood(good);
    dbManager.getDBGood().writeInventory();
    console.log(dbManager.getDBGood()._inventory);
    expect(dbManager.getDBGood()._inventory.length).toBe(1);

    expect(() => (dbManager.addGood(good2))).toThrow(AppError);

  });
});

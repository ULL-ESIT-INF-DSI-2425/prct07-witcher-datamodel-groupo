import { describe, it, expect } from 'vitest';
import { DB_Good } from '../../src/db/db_good.js';
// import { Good } from '../../src/models/good.js';
import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import { GoodSchema } from '../../src/types/goodschema.js';
import { GoodStack } from '../../src/types/goodstack.js';
import { Materials } from '../../src/enums/materials.js';
import { Good } from '../../src/models/good.js';

describe ('DB_Good', () => {
  // crear la base de datos para pruebas 

  const adapter = new JSONFile<GoodSchema>('./src/db/db_good.json');
  const db = new Low<GoodSchema>(adapter, { goods: [] });
  const dbGood = new DB_Good(adapter, db);
  it ('Should be defined', ()  => {
    expect(dbGood).toBeDefined();
  });
  it ('Should have a property adapter', ()  => {
    expect(dbGood.adapter).toBeDefined();
  });
  it ('Should have a property db', ()  => {
    expect(dbGood.db).toBeDefined();
  });
  it ('Should have a method to initialize the database', async () => {
    await dbGood.initDB();
    expect(dbGood).toBeDefined();
  });
  it ('Should have a method to read the inventory', async () => {
    await dbGood.readInventory();
    expect(dbGood).toBeDefined();
  });
  it ('Should have a method to write the inventory', async () => {
    await dbGood.writeInventory();
    expect(dbGood).toBeDefined();
  });
  it ('Should have a property _inventory', () => {
    expect(dbGood._inventory).toBeDefined();
  });
  // test de readInventory
  it ('Should read and write the inventory', async () => {
    // meter en el inventario un objeto para comprabar si se lee correctamente
    let good1: Good = new Good(1, 'Espada', 'Una espada de acero', Materials.MAKAHAM_STEEL, 2, 10);
    let addGoodStack: GoodStack = [good1, 1];
    dbGood._inventory.push(addGoodStack);
    // escribir en la base de datos
    await dbGood.writeInventory();
    // comprobar si se lee correctamente
    await dbGood.readInventory();
    // comprobar si el objeto esta en el inventario
    expect(dbGood._inventory.some((good) => good[0].id === good1._id)).toBe(true);
  });
  it ('Should read and write a set of goods', async () => {
    let good1: Good = new Good(1, 'Espada', 'Una espada de acero', Materials.MAKAHAM_STEEL, 2, 10);
    let good2: Good = new Good(2, 'Hacha', 'Un hacha de acero', Materials.RESIN, 3, 15);
    let good3: Good = new Good(3, 'Martillo', 'Un martillo de acero', Materials.STEEL_LINE, 2.5, 12);
    let addGoodStack1: GoodStack = [good1, 1];
    let addGoodStack2: GoodStack = [good2, 1];
    let addGoodStack3: GoodStack = [good3, 1];
    dbGood._inventory.push(addGoodStack1, addGoodStack2, addGoodStack3);
    await dbGood.writeInventory();
    await dbGood.readInventory();
    expect(dbGood._inventory.some((good) => good[0].id === good1._id)).toBe(true);
    expect(dbGood._inventory.some((good) => good[0].id === good2._id)).toBe(true);
    expect(dbGood._inventory.some((good) => good[0].id === good3._id)).toBe(true);
  });

});
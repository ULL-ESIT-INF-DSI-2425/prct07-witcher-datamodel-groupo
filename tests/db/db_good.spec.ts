import { describe, it, expect } from 'vitest';
import { DB_Good } from '../../src/db/db_good.js';
// import { Good } from '../../src/models/good.js';
import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import { GoodSchema } from '../../src/types/goodschema.js';
import { GoodStack } from '../../src/types/goodstack.js';
import { Materials } from '../../src/enums/materials.js';
import { Good } from '../../src/models/good.js';

describe('DB_Good', () => {
  const adapter = new JSONFile<GoodSchema>('./src/db/db_good.json');
  const db = new Low<GoodSchema>(adapter, { goods: [] });
  const dbGood = new DB_Good(adapter, db);

  it('Should be defined', () => {
    expect(dbGood).toBeDefined();
  });

  it('Should have a property adapter', () => {
    expect(dbGood.adapter).toBeDefined();
  });

  it('Should have a property db', () => {
    expect(dbGood.db).toBeDefined();
  });

  it('Should have a method to initialize the database', async () => {
    await dbGood.initDB();
    expect(dbGood).toBeDefined();
  });

  it('Should have a method to read the inventory', async () => {
    await dbGood.readInventory();
    expect(dbGood).toBeDefined();
  });

  it('Should have a method to write the inventory', async () => {
    await dbGood.writeInventory();
    expect(dbGood).toBeDefined();
  });

  it('Should have a property _inventory', () => {
    expect(dbGood._inventory).toBeDefined();
  });

  it('Should read and write the inventory', async () => {
    let good1: Good = new Good(1, 'Espada', 'Una espada de acero', Materials.MAKAHAM_STEEL, 2, 10);
    let addGoodStack: GoodStack = [good1, 1];
    dbGood._inventory.push(addGoodStack);
    await dbGood.writeInventory();
    await dbGood.readInventory();
    expect(dbGood._inventory.some((good) => good[0].id === good1._id)).toBe(true);
  });

  it('Should read and write a set of goods', async () => {
    await dbGood.readInventory();
    //console.log(dbGood._inventory)
    let good1: Good = new Good(1, 'Espada', 'Una espada de acero', Materials.MAKAHAM_STEEL, 2, 10);
    let good2: Good = new Good(2, 'Hacha', 'Un hacha de acero', Materials.RESIN, 3, 15);
    let good3: Good = new Good(3, 'Martillo', 'Un martillo de acero', Materials.STEEL_LINE, 2.5, 12);
    //let addGoodStack1: GoodStack = [good1, 1];
    let addGoodStack2: GoodStack = [good2, 1];
    let addGoodStack3: GoodStack = [good3, 1];
    dbGood._inventory.push(addGoodStack2, addGoodStack3);
    await dbGood.writeInventory();
    //console.log(dbGood._inventory)
    expect(dbGood._inventory.some((good) => good[0].id === good1._id)).toBe(true);
    expect(dbGood._inventory.some((good) => good[0].id === good2._id)).toBe(true);
    expect(dbGood._inventory.some((good) => good[0].id === good3._id)).toBe(true);
  });

  it('Should add a good to the inventory', () => {
    let good1: Good = new Good(4, 'Escudo', 'Un escudo de madera', Materials.MONSTER_ESSENCE, 5, 20);
    dbGood.addGood(good1);
    //console.log(dbGood._inventory);
    expect(dbGood._inventory.some((good) => good[0].id === good1._id)).toBe(true);
    expect(dbGood._inventory.find((good) => good[0].id === good1._id)?.[1]).toBe(1);
  });

  it('Should increase the quantity of an existing good in the inventory', () => {
    let good1: Good = new Good(4, 'Escudo', 'Un escudo de madera', Materials.MONSTER_ESSENCE, 5, 20);
    dbGood.addGood(good1);
    //console.log(dbGood._inventory);
    //console.log(dbGood._inventory);
    expect(dbGood._inventory.find((good) => good[0].id === good1._id)?.[1]).toBe(2);
  });

  it('Should throw an error when adding a good with a duplicate ID but different name', () => {
    let good1: Good = new Good(4, 'Escudo Diferente', 'Un escudo diferente', Materials.MAGIC_ESSENCE, 5, 20);
    expect(() => dbGood.addGood(good1)).toThrow('That ID is already taken!');
  });

  it('Should decrease the quantity of an existing good in the inventory', () => {
    let good1: Good = new Good(4, 'Escudo', 'Un escudo de madera', Materials.MONSTER_ESSENCE, 5, 20);
    dbGood.removeGood(good1);
    expect(dbGood._inventory.find((good) => good[0].id === good1._id)?.[1]).toBe(1);
    dbGood.writeInventory()
  });

  it('Should remove a good from the inventory', () => {
    let good1: Good = new Good(5, 'Casco', 'Un casco de hierro', Materials.MAKAHAM_STEEL, 3, 15);
    dbGood.addGood(good1);
    //console.log(dbGood._inventory);
    dbGood.removeGood(good1);
    //console.log(dbGood._inventory);
    expect(dbGood._inventory.some((good) => good[0].id === good1._id)).toBe(false);
    dbGood.writeInventory();
    //console.log(dbGood._inventory);
  });

  it('Should throw an error when removing a good not in the inventory', () => {
    let good1: Good = new Good(6, 'Lanza', 'Una lanza de acero', Materials.STEEL_LINE, 4, 25);
    expect(() => dbGood.removeGood(good1)).toThrow('The good is not in the inventory');
  });

  it('Sorting goods methods', () => {
    dbGood.readInventory();
    expect(dbGood.sortGoodsAlphabetically('asc').map((good) => good.name)).toEqual(['Escudo', 'Espada', 'Hacha', 'Martillo']);
    expect(dbGood.sortGoodsAlphabetically('desc').map((good) => good.name)).toEqual(['Martillo', 'Hacha', 'Espada', 'Escudo']);
    expect(dbGood.sortGoodsByValue('asc').map((good) => good.name)).toEqual(['Espada', 'Martillo', 'Hacha', 'Escudo']);
    expect(dbGood.sortGoodsByValue('desc').map((good) => good.name)).toEqual(['Escudo', 'Hacha', 'Martillo', 'Espada']);
  });

  it('Searching goods methods', () => {
    dbGood.readInventory();
    expect(dbGood.searchGoodsByName('Espada')).toEqual([
      [
        {
          "description": "Una espada de acero",
          "id": 1,
          "material": "Makaham Steel",
          "name": "Espada",
          "value": 10,
          "weight": 2,
        },
        1,
      ],
    ]);
    expect(dbGood.searchGoodsByDescription('Un escudo de madera')).toEqual([
      [
        {
          "description": "Un escudo de madera",
          "id": 4,
          "material": "Monster Essence",
          "name": "Escudo",
          "value": 20,
          "weight": 5,
        },
        1,
      ],
    ]);
  });

  it('Add 16 more goods', () => {
    dbGood.readInventory();

    const goods = [
      new Good(5, 'Espada', 'Una espada de acero', Materials.MAKAHAM_STEEL, 2, 10),
      new Good(6, 'Hacha', 'Un hacha de acero', Materials.RESIN, 3, 15),
      new Good(7, 'Martillo', 'Un martillo de acero', Materials.STEEL_LINE, 2.5, 12),
      new Good(8, 'Escudo', 'Un escudo de madera', Materials.MONSTER_ESSENCE, 5, 20),
      new Good(9, 'Casco', 'Un casco de hierro', Materials.MAKAHAM_STEEL, 3, 15),
      new Good(10, 'Lanza', 'Una lanza de acero', Materials.STEEL_LINE, 4, 25),
      new Good(11, 'Arco', 'Un arco de madera', Materials.RESIN, 1.5, 8),
      new Good(12, 'Flecha', 'Un conjunto de flechas', Materials.STEEL_LINE, 0.5, 5),
      new Good(13, 'Daga', 'Una daga pequeña', Materials.MAKAHAM_STEEL, 1, 7),
      new Good(14, 'Ballesta', 'Una ballesta de acero', Materials.STEEL_LINE, 4, 30),
      new Good(15, 'Maza', 'Una maza pesada', Materials.MONSTER_ESSENCE, 6, 25),
      new Good(16, 'Pico', 'Un pico de minería', Materials.STEEL_LINE, 5, 18),
      new Good(17, 'Cuchillo', 'Un cuchillo de cocina', Materials.MAKAHAM_STEEL, 0.8, 6),
      new Good(18, 'Báculo', 'Un báculo mágico', Materials.MAGIC_ESSENCE, 3, 50),
      new Good(19, 'Pergamino', 'Un pergamino antiguo', Materials.MAGIC_ESSENCE, 0.2, 100),
      new Good(20, 'Poción', 'Una poción curativa', Materials.MONSTER_ESSENCE, 0.5, 12),
    ];
    goods.forEach((good) => dbGood.addGood(good));

    expect(dbGood._inventory.length).toBe(20);

    dbGood.writeInventory();

  });


  it('Should modify attributes of a good in the inventory', () => {
    dbGood.readInventory()
  
    // Modify the name of the good
    dbGood.modifyGoodAttribute(1, 'name', 'Espada Legendaria');
    expect(dbGood._inventory.find((goodStack) => goodStack[0].id === 1)?.[0].name).toBe('Espada Legendaria');
    dbGood.writeInventory();

    dbGood.modifyGoodAttribute(1, 'description', 'Una espada legendaria de acero');
    expect(dbGood._inventory.find((goodStack) => goodStack[0].id === 1)?.[0].description).toBe('Una espada legendaria de acero');
  
    // Modify the value of the good
    dbGood.modifyGoodAttribute(2, 'value', 50);
    expect(dbGood._inventory.find((goodStack) => goodStack[0].id === 2)?.[0].value).toBe(50);
  
    // Modify the weight of the good
    dbGood.modifyGoodAttribute(5, 'weight', 3);
    expect(dbGood._inventory.find((goodStack) => goodStack[0].id === 5)?.[0].weight).toBe(3);
  
    // Modify the material of the good
    dbGood.modifyGoodAttribute(6, 'material', Materials.STEEL_LINE);
    expect(dbGood._inventory.find((goodStack) => goodStack[0].id === 6)?.[0].material).toBe(Materials.STEEL_LINE);

    dbGood.writeInventory();
  });
});
import { describe, it, expect} from 'vitest';
import { Inventory } from '../../src/services/inventory.ts';
import { Materials } from '../../src/enums/materials.ts';
import { Locations } from '../../src/enums/locations.ts';
import { MerchantType } from '../../src/enums/merchantType.ts';
import { Races } from '../../src/enums/races.ts';
import { Good } from '../../src/models/good.ts';
import { Merchant } from '../../src/models/merchant.ts';
import { Client } from '../../src/models/client.ts';

describe('Inventory service initialize and methods', () => {
  it('Should be defined', () => {
    expect(Inventory).toBeDefined();
  });
  it('Should create a new instance of Inventory', () => {
    const inventory = new Inventory();
    expect(inventory).toBeInstanceOf(Inventory);
  });
  it('Should have a method to initialize the database', () => {
    const inventory = new Inventory();
    expect(inventory.initDB).toBeDefined();
  });
  it('Should have a method to add a good to the database', () => {
    const inventory = new Inventory();
    expect(inventory.addGood).toBeDefined();
  });
  it('Should have a method to add a Merchant to the database', () => {
    const inventory = new Inventory();
    expect(inventory.addMerchant).toBeDefined();
  });
  it ('Should have a method to add a Client to the database', () => {
    const inventory = new Inventory();
    expect(inventory.addClient).toBeDefined();
  });
});

describe('Inventory service methods execution', () => {
  it ('Should add a good to the database', async () => {
    const inventory = new Inventory();
    await inventory.initDB();
    const good = new Good(0, 'Makaham Steel Sword', 'A sword made of the finest steel from Mahakam', Materials.MAKAHAM_STEEL, 3.5, 500);
    await inventory.addGood(good);
    expect(inventory).toBeDefined();
  });
  it ('Should add a merchant to the database', async () => {
    const inventory = new Inventory();
    await inventory.initDB();
    const merchant = new Merchant(0, 'Yennefer', MerchantType.ALCHEMIST, Locations.KAER_MORHEN);
    await inventory.addMerchant(merchant);
    expect(inventory).toBeDefined();
  });
  it ('Should add a client to the database', async () => {
    const inventory = new Inventory();
    await inventory.initDB();
    const client = new Client(0, 'Geralt', Races.WITCHER, Locations.KAER_MORHEN);
    await inventory.addClient(client);
    expect(inventory).toBeDefined();
  });
});
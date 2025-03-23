import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { DB_Transactions } from '../../src/db/db_transaction.js';
import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import { TransactionsSchema } from '../../src/types/transactionsschema.js';
import { DB_Good } from '../../src/db/db_good.js';
import { GoodSchema } from '../../src/types/goodschema.js';
import { ClientSchema } from '../../src/types/clientschema.js';
import { MerchantSchema } from '../../src/types/merchantschema.js';
import { DB_Client } from '../../src/db/db_clients.js';
import { DB_Merchant } from '../../src/db/db_merchants.js';
import { Good } from '../../src/models/good.js';
import { Client } from '../../src/models/client.js';
import { Merchant } from '../../src/models/merchant.js';
import { Sale } from '../../src/models/sale.js';
import { Shop } from '../../src/models/shop.js';
import { Return } from '../../src/models/return.js';
import { Materials } from '../../src/enums/materials.js';
import { Races } from '../../src/enums/races.js';
import { Locations } from '../../src/enums/locations.js';

describe('DB_Transactions', () => {
  let dbTransactions: DB_Transactions;
  let dbGood: DB_Good;
  let dbClients: DB_Client;
  let dbMerchants: DB_Merchant;
  beforeAll(async() => {

    const adapterG = new JSONFile<GoodSchema>('./src/db/db_good.json');
    const dbG = new Low<GoodSchema>(adapterG, { goods: [] });
    dbGood = new DB_Good(adapterG, dbG);
    
    const adapterM = new JSONFile<MerchantSchema>('./src/db/db_merchants.json');
    const dbM = new Low<MerchantSchema>(adapterM, {merchant: []});
    dbMerchants = new DB_Merchant(adapterM, dbM);


    const adapterC = new JSONFile<ClientSchema>('./src/db/db_clients.json');
    const dbC = new Low<ClientSchema>(adapterC, { clients: [] });
    dbClients = new DB_Client(adapterC, dbC);

    // const adapterT = new JSONFile<TransactionsSchema>('./src/db/db_transactions.json');
    const filePath = './src/db/db_transactions.json';
    // const dbT = new Low<TransactionsSchema>(adapterT, { sale: [], shop: [], return: [] });
    dbTransactions = new DB_Transactions(filePath, dbGood, dbMerchants, dbClients);

    await dbGood.initDB();
    await dbGood.readInventory();
    await dbMerchants.initDB();
    await dbTransactions.initDB();
  });

  
  it ('Should be defined', () => {
    expect(dbTransactions).toBeDefined();
  });
  
  it('Should add a valid sale and decrement stock', () => {
    const good = dbTransactions.db_sale._inventory[0][0];
    const client = dbTransactions._dbclient._inventory[0];
    const sale = new Sale(1, client, good, 1, 10, new Date());

    console.log(dbTransactions.db_sale._inventory);
    console.log("\n\n");

    dbTransactions.addSale(sale);

    // Verify the stock was decremented
    //const updatedGood = dbTransactions._dbclient._inventory.find((goodStack) => goodStack[0].id === good.id);
    console.log(dbTransactions.db_sale._inventory)
    console.log(dbTransactions._sales);
    //expect(updatedGood).toBeUndefined(); // Initial stock was 1, should be removed
    
    // write inventory
    dbTransactions.writeTransactions();
    dbGood.writeInventory();
    
  });

  // it('Should add a valid shop', () => {
  //   const merchant = dbManager.getDBMerchant()._inventory[0];
  //   const shop = new Shop(1, merchant, 'Blacksmith', Locations.NOVIGRAD);

  //   dbTransactions.addShop(shop);

  //   // Verify the shop was added
  //   expect(dbTransactions._shops).toContain(shop);
  // });

  // it('Should add a valid return and increment stock', () => {
  //   const client = dbManager.getDBClient()._clients[0];
  //   const good = dbManager.getDBGood()._inventory[0][0];
  //   const returnTransaction = new Return(1, client, good, 2, new Date());

  //   dbTransactions.addReturn(returnTransaction);

  //   // Verify the return was added
  //   expect(dbTransactions._returns).toContain(returnTransaction);

  //   // Verify the stock was incremented
  //   const updatedGood = dbManager.getDBGood()._inventory.find((goodStack) => goodStack[0].id === good.id);
  //   expect(updatedGood[1]).toBe(7); // Initial stock was 5, incremented by 2
  // });

  // it('Should throw an error if the good does not exist in the inventory for a return', () => {
  //   const client = dbManager.getDBClient()._clients[0];
  //   const nonExistentGood = new Good(99, 'Hacha', 'Un hacha de acero', Materials.RESIN, 3, 15);
  //   const returnTransaction = new Return(2, client, nonExistentGood, 1, new Date());

  //   expect(() => dbTransactions.addReturn(returnTransaction)).toThrow('The good does not exist in the database');
  // });

  // it('Should throw an error if the client does not exist for a return', () => {
  //   const nonExistentClient = new Client(99, 'Yennefer', Races.ELF, Locations.VIZIMA);
  //   const good = dbManager.getDBGood()._inventory[0][0];
  //   const returnTransaction = new Return(3, nonExistentClient, good, 1, new Date());

  //   expect(() => dbTransactions.addReturn(returnTransaction)).toThrow('The client does not exist in the database');
  // });

  // it('Should throw an error if the merchant does not exist for a shop', () => {
  //   const nonExistentMerchant = new Merchant(99, 'Dandelion', Races.HUMAN, Locations.NOVIGRAD);
  //   const shop = new Shop(2, nonExistentMerchant, 'Tavern', Locations.NOVIGRAD);

  //   expect(() => dbTransactions.addShop(shop)).toThrow('The merchant does not exist in the database');
  // });
});
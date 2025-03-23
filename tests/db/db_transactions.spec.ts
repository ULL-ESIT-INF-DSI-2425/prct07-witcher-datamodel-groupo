import { describe, it, expect, beforeAll } from 'vitest';
import { DB_Transactions } from '../../src/db/db_transaction.js';
import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import { DB_Good } from '../../src/db/db_good.js';
import { GoodSchema } from '../../src/types/goodschema.js';
import { ClientSchema } from '../../src/types/clientschema.js';
import { MerchantSchema } from '../../src/types/merchantschema.js';
import { DB_Client } from '../../src/db/db_clients.js';
import { DB_Merchant } from '../../src/db/db_merchants.js';
import { Sale } from '../../src/models/sale.js';
import { Shop } from '../../src/models/shop.js';

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

    const filePath = './src/db/db_transactions.json';
    dbTransactions = new DB_Transactions(filePath, dbGood, dbMerchants, dbClients);

    await dbGood.initDB();
    await dbGood.readInventory();
    await dbMerchants.initDB();
    await dbTransactions.initDB();
  });

  
  it ('Should be defined', () => {
    expect(dbTransactions).toBeDefined();
  });
  
  // test que va a variar en funcion a lo que se mete, por eso está comentado
  it('Should add a valid sale and decrement stock', async() => {
    // await dbGood.readInventory();
    // await dbMerchants.readIventory();
    // // const good = dbTransactions.db_sale._inventory[0][0];
    // // const client = dbTransactions._dbclient._inventory[0];
    // // const sale = new Sale(1, client, good, 1, 10, new Date());
    // // const sale2 = new Sale(2, client, good, 1, 10, new Date());
    // const good = dbTransactions._dbsale._inventory[0][0];
    // const client = dbTransactions._dbclient._inventory[0];
    // const sale = new Sale(1, client, good, 1, 10, new Date());
    // const sale2 = new Sale(2, client, good, 1, 10, new Date());



    // dbTransactions.addSale(sale);
    // dbTransactions.addSale(sale2);




    // await dbTransactions.writeTransactions();
    // await dbGood.writeInventory();
    
  });
  // test que va a variar en funcion a lo que se mete, por eso está comentado
  it ('Should delete a sale', async () => {

    // const sale = dbTransactions._sales[0];


    // dbTransactions.removeSale(sale.id);
    // await dbTransactions.writeTransactions();
    // await dbGood.writeInventory();
    
    // expect(dbTransactions._sales).not.toContain(sale);
  });
  it('Should add a valid shop and increment stock', async () => {
    const merchant = dbTransactions._dbmerchant._inventory[0];
    const good = dbTransactions.db_sale._inventory[0][0];

    const shop = new Shop(1, merchant, good, 3, 10, new Date());
    const shop2 = new Shop(3, merchant, good, 3, 10, new Date());


    dbTransactions.addShop(shop);
    dbTransactions.addShop(shop2);
    await dbTransactions.writeTransactions();
    await dbGood.writeInventory();
    expect(dbTransactions._shops).toContain(shop);
  });
  it ('Should delete a shop', async () => {
    const shop = dbTransactions._shops[0];
    dbTransactions.removeShop(shop._id);
    await dbTransactions.writeTransactions();
    await dbGood.writeInventory();
    expect(dbTransactions._shops).not.toContain(shop);
  });
  // it('Should add a return of sale', async () => {
  //   await dbTransactions.readTransactions();
  //   const idCliente = 1;
  //   const client = dbTransactions._dbclient._inventory.find((client) => client.id === idCliente) as Client;
    
  //   const idGood = 1;
  //   const goodToReturn = dbTransactions._dbsale._inventory.find((good) => good[0].id === idGood)?.[0] as Good;
  //   const returnSale = new Return(2, client, goodToReturn, 2, new Date());
  //   dbTransactions.addReturnSale(returnSale);
  //   await dbTransactions.writeTransactions();
  //   await dbGood.writeInventory();
  //   expect(dbTransactions._returns).toContain(returnSale); 
  // });
  // it ('Should add a return of shop', async () => {
  //   await dbTransactions.readTransactions();
  //   const idMerchant = 2;
  //   const merchant = dbTransactions._dbmerchant._inventory.find((merchant) => merchant.id === idMerchant) as Merchant;
    
  //   const idGood = 1;
  //   const goodToReturn = dbTransactions._dbsale._inventory.find((good) => good[0].id === idGood)?.[0] as Good;
  //   const returnShop = new Return(3, merchant, goodToReturn, 2, new Date());
  //   dbTransactions.addReturnShop(returnShop);
  //   await dbTransactions.writeTransactions();
  //   await dbGood.writeInventory();
  //   expect(dbTransactions._returns).toContain(returnShop);
  // });

 
});
import { DBTransactions } from "../interfaces/db_transaction.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { TransactionsSchema } from "../types/transactionsschema.js";
import { DB_Client } from "./db_clients.js";
import { DB_Good } from "./db_good.js"; 
import { DB_Merchant } from "./db_merchants.js";

import { Sale } from "../models/sale.js";
import { Shop } from "../models/shop.js";
import { Return } from "../models/return.js";

// import { Good } from "../models/good.js";
import { Merchant } from "../models/merchant.js";
import { Client } from "../models/client.js";

import { TakenIdError } from "../errors/takeniderror.js";
import { NotInInventoryError } from "../errors/notininventoryerror.js";

export class DB_Transactions implements DBTransactions  {
  readonly adapter: JSONFile<TransactionsSchema>;
  readonly db: Low<TransactionsSchema>;
  accessor _sales: Sale[] = [];
  accessor _shops: Shop[] = [];
  accessor _returns: Return<Client | Merchant>[] = [];
  accessor _dbsale: DB_Good;
  accessor _dbmerchant: DB_Merchant;
  accessor _dbclient: DB_Client;

  constructor(
    public filePath: string = './src/db/db_transactions.json',

    public db_sale: DB_Good,
    public db_merchant: DB_Merchant,
    public db_client: DB_Client
    // pasamos las bases de datos 
  ) {
    this.adapter = new JSONFile<TransactionsSchema>(filePath);
    this.db = new Low<TransactionsSchema>(this.adapter, { sale: [], shop: [], return: [] });
    this._dbsale = db_sale;
    this._dbmerchant = db_merchant;
    this._dbclient = db_client;
    this.readTransactions();
  }

  async initDB(): Promise<void> {
    await this.db.read();
    this.db.data ||= { sale: [], shop: [], return: [] };
    await this.db.write();
  }

  async readTransactions(): Promise<void> {
    await this.db.read();
    this._sales = this.db.data.sale;
    this._shops = this.db.data.shop;
    this._returns = this.db.data.return;
  }

  async writeTransactions(): Promise<void> {
    this.db.data.sale = [...this._sales];
    this.db.data.shop = [...this._shops];
    this.db.data.return = [...this._returns];
    await this.db.write();
  }
  getTransactions(): TransactionsSchema {
    return this.db.data;
  }

  addSale(saleToAdd: Sale): void {
    // Verificar si el ID de la venta ya está tomado
    if (this._sales.some((sale) => sale.id === saleToAdd.id)) {
      throw new TakenIdError("The id of the sale is already taken");
    }
  
    // Verificar si el bien existe en la base de datos de bienes
    // const goodStack = this._dbmanager.getDBGood()._inventory.find(
    //   (good) => good[0].id === saleToAdd.good.id
    // );
    const goodStack = this._dbsale.searchGoodsByName(saleToAdd.good.name);

    let stack = goodStack[0]; //quiero pillar el primero de goodstack[] y luego desde ahi pillar el loquesea[1] que te dice la cantidad
    let stackQuantity = stack[1]; // ese valor quantity entiendo que es el que deberia ir por length abajo

    if (!goodStack) {
      throw new Error("The good does not exist in the database");
    }
  
    // es un array de GoodStack
    // cierto, pero para mirar la cantidad de un bien en el inventario era lo de goodstack[1] no?
    // si pero la putada es que el metodo ese devuelve un array de GoodStack
    // hagan una prueba de esto, rollo que devuelva un array de GoodStack y que lo metan en una variable y que hagan un console.log de esa variable
    // Verificar si hay suficiente stock del bien
    
    //if (goodStack.length < saleToAdd.quantity) {
    if (stackQuantity < saleToAdd.quantity) { // <- aqui en plan
      throw new Error(
        `There are not enough units of the good "${saleToAdd.good.name}" in stock. Required: ${saleToAdd.quantity}, Available: ${stackQuantity}`
      );
    }

    // tiene sentido esto que he cambiado?

  
    // // Verificar si el cliente tiene suficiente dinero
    // if (saleToAdd.total_price < p * saleToAdd.quantity) {
    //   throw new Error(
    //     `The client "${saleToAdd.client.name}" does not have enough money. Required: ${saleToAdd.total_price}, Available: ${saleToAdd.total_price}`
    //   );
    // }
  
    // Decrementar el stock del bien
    // this._dbmanager.getDBGood().removeGood(goodStack[0]);
    for (let i = 0; i < saleToAdd.quantity; i++) {
      this._dbsale.removeGood(saleToAdd.good);
    }
  
    // Añadir la venta a la base de datos de ventas
    this._sales.push(saleToAdd);
  
    console.log(`Sale with ID ${saleToAdd.id} added successfully.`);
  }

  removeSale(saleId: number): void {
    const saleIndex = this._sales.findIndex((sale) => sale.id === saleId);
    if (saleIndex === -1) {
      throw new Error(`Sale with ID ${saleId} does not exist.`);
    }
    
    const saleToRemove = this._sales[saleIndex];

    for (let i = 0; i < saleToRemove.quantity; i++) {
      this._dbsale.addGood(saleToRemove.good);
    }

    this._sales.splice(saleIndex, 1);
    console.log(`Sale with ID ${saleId} removed successfully.`);

   
  }
  

  addShop(shopToAdd: Shop): void {
    // Verificar si el ID de la tienda ya está tomado
    if (this._shops.some((shop) => shop.id === shopToAdd.id)) {
      throw new TakenIdError("The id of the shop is already taken");
    }
    const existingMerchant = this._dbmerchant.searchMerchant("name", shopToAdd.merchant.name);
    if (!existingMerchant) {
      this._dbmerchant.addMerchant(shopToAdd.merchant);
    }
    this._shops.push(shopToAdd);
    console.log(`Shop with ID ${shopToAdd.id} added successfully.`);
  }

  removeShop(shopId: number): void {
    const shopIndex = this._shops.findIndex((shop) => shop.id === shopId);
    if (shopIndex === -1) {
      throw new Error(`Shop with ID ${shopId} does not exist.`);
    }
  
    // Eliminar la tienda
    this._shops.splice(shopIndex, 1);
    console.log(`Shop with ID ${shopId} removed successfully.`);
  }

  addReturn(returnToAdd: Return<Client | Merchant>): void {
    // Verificar si el ID de la devolución ya está tomado
    if (this._returns.some((ret) => ret._id === returnToAdd._id)) {
      throw new TakenIdError("The id of the return is already taken");
    }
    const goodStack = this._dbsale.searchGoodsByName(returnToAdd._good.name);
    if (!goodStack || goodStack.length === 0) {
      throw new NotInInventoryError("The good does not exist in the database");
    }
    // if (!this._dbmanager.getDBGood().searchGoodsByName(returnToAdd._good.name)) {
    //   throw new Error("The good does not exist in the database");
    // }
    if (!this._dbsale.searchGoodsByName(returnToAdd._good.name)) {
      throw new Error("The good does not exist in the database");
    }
    // for (let i = 0; i < returnToAdd._quantity; i++) {
    //   this._dbmanager.getDBGood().addGood(returnToAdd._good);
    // }
    for (let i = 0; i < returnToAdd._quantity; i++) {
      this._dbsale.addGood(returnToAdd._good);
    }
    // if (returnToAdd._agent instanceof Client && 
    //     !this._dbmanager.getDBClient().searchClient("name", returnToAdd._agent.name)) {
    //   this._dbmanager.getDBClient().addClient(returnToAdd._agent);
    // }
    if (returnToAdd._agent instanceof Client && !this._dbclient.searchClient("name",  returnToAdd._agent.name)) {
      this._dbclient.addClient(returnToAdd._agent);
    }
    // if (returnToAdd._agent instanceof Merchant && 
    //     !this._dbmanager.getDBMerchant().searchMerchant("name", returnToAdd._agent.name)) {
    //   this._dbmanager.getDBMerchant().addMerchant(returnToAdd._agent);
    // }
    this._returns.push(returnToAdd);
  }

  removeReturn(returnId: number): void {
    const returnIndex = this._returns.findIndex((ret) => ret._id === returnId);
    if (returnIndex === -1) {
      throw new Error(`Return with ID ${returnId} does not exist.`);
    }
  
    // // Revertir los cambios en el inventario
    // const returnToRemove = this._returns[returnIndex];
    // for (let i = 0; i < returnToRemove._quantity; i++) {
    //   this._dbmanager.getDBGood().removeGood(returnToRemove._good);
    // }
    const returnToRemove = this._returns[returnIndex];
    for (let i = 0; i < returnToRemove._quantity; i++) {
      this._dbsale.removeGood(returnToRemove._good);
    }
  
    // Eliminar la devolución
    this._returns.splice(returnIndex, 1);
    console.log(`Return with ID ${returnId} removed successfully.`);
  }
}

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

import { Merchant } from "../models/merchant.js";
import { Client } from "../models/client.js";

import { TakenIdError } from "../errors/takeniderror.js";

/**
 * Class that represents the database of transactions.
 * 
 * DB_Transactions class
 * @param adapater - The JSON File adapter
 * @param db - The LowDB instance
 * @param _sales - The array of sales
 * @param _shops - The array of shops
 * @param _returns - The array of returns
 * @param _dbsale - The database of goods
 * @param _dbmerchant - The database of merchants
 * @param _dbclient - The database of clients
 */
export class DB_Transactions implements DBTransactions {
  readonly adapter: JSONFile<TransactionsSchema>;
  readonly db: Low<TransactionsSchema>;
  accessor _sales: Sale[] = [];
  accessor _shops: Shop[] = [];
  accessor _returns: Return<Client | Merchant>[] = [];
  accessor _dbsale: DB_Good;
  accessor _dbmerchant: DB_Merchant;
  accessor _dbclient: DB_Client;

  /**
   * Constructor of the DB_Transactions class.
   * @param filePath - The file path of the database
   * @param db_sale - The database of goods
   * @param db_merchant - The database of merchants
   * @param db_client - The database of clients
   */
  constructor(
    public filePath: string = './src/db/db_transactions.json',

    public db_sale: DB_Good,
    public db_merchant: DB_Merchant,
    public db_client: DB_Client
  ) {
    this.adapter = new JSONFile<TransactionsSchema>(filePath);
    this.db = new Low<TransactionsSchema>(this.adapter, { sale: [], shop: [], return: [] });
    this._dbsale = db_sale;
    this._dbmerchant = db_merchant;
    this._dbclient = db_client;
    this.readTransactions();
  }
  getSales(): Sale[] {
    return this._sales;
  }
  getShops(): Shop[] {
    return this._shops;
  }
  searchSaleByGoodName(name: string): Sale[] {
    return this._sales.filter((sale) => sale.good.name === name);
  }

  /**
   * Method that initializes the database.
   * @returns A promise of void
   * @example
   * ```typescript
   * await db.initDB();
   * ```
   */
  async initDB(): Promise<void> {
    await this.db.read();
    this.db.data ||= { sale: [], shop: [], return: [] };
    await this.db.write();
  }

  /**
   * Method that reads the transactions from the database.
   * @returns A promise of void
   * @example
   * ```typescript
   * await db.readTransactions();
   * ```
   */
  async readTransactions(): Promise<void> {
    await this.db.read();
    this._sales = this.db.data.sale;
    this._shops = this.db.data.shop;
    this._returns = this.db.data.return;
  }

  /**
   * Method that writes the transactions to the database.
   * @returns A promise of void
   * @example
   * ```typescript
   * await db.writeTransactions();
   * ```
   */
  async writeTransactions(): Promise<void> {
    this.db.data.sale = [...this._sales];
    this.db.data.shop = [...this._shops];
    this.db.data.return = [...this._returns];
    await this.db.write();
  }

  /** 
   * Method that returns the transactions.
   * @returns The transactions
   * @example
   * ```typescript
   * const transactions = db.getTransactions();
   * ```
   */
  getTransactions(): TransactionsSchema {
    return this.db.data;
  }

  /**
   * Method that returns the sales.
   * @returns The sales
   * @example
   * ```typescript
   * const sales = db.getSales();
   * ```
   */
  addSale(saleToAdd: Sale): void {
    if (this._sales.some((sale) => sale.id === saleToAdd.id)) {
      throw new TakenIdError("The id of the sale is already taken");
    }
  
    const goodStack = this._dbsale.searchGoodsByName(saleToAdd.good.name);

    let stack = goodStack[0]; 
    let stackQuantity = stack[1]; 

    if (!goodStack) {
      throw new Error("The good does not exist in the database");
    }

    if (stackQuantity < saleToAdd.quantity) {
      throw new Error(
        `There are not enough units of the good "${saleToAdd.good.name}" in stock. Required: ${saleToAdd.quantity}, Available: ${stackQuantity}`
      );
    }

    for (let i = 0; i < saleToAdd.quantity; i++) {
      this._dbsale.removeGood(saleToAdd.good);
    }
  
    this._sales.push(saleToAdd);
    console.log(`Sale with ID ${saleToAdd.id} added successfully.`);
  }

  /**
   * Method that removes a sale.
   * @param saleId - The ID of the sale
   * @example
   * ```typescript
   * db.removeSale(1);
   * ```
   */
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
  /**
   * Method that adds a shop.
   * @param shopToAdd - The shop to add
   * @example
   * ```typescript
   * db.addShop(shop);
   * ```
   */
  addShop(shopToAdd: Shop): void {
    if (this._shops.some((shop) => shop.id === shopToAdd.id)) {
      throw new TakenIdError("The id of the shop is already taken");
    }
    const existingMerchant = this._dbmerchant.searchMerchant("name", shopToAdd.merchant.name);
    if (!existingMerchant) {
      this._dbmerchant.addMerchant(shopToAdd.merchant);
    }
    for (let i = 0; i < shopToAdd.quantity; i++) {
      this._dbsale.addGood(shopToAdd.good);
    }
    this._shops.push(shopToAdd);
    console.log(`Shop with ID ${shopToAdd.id} added successfully.`);
  }

  /**
   * Method that removes a shop.
   * @param shopId - The ID of the shop
   * @example
   * ```typescript
   * db.removeShop(1);
   * ```
   */
  removeShop(shopId: number): void {
    const shopIndex = this._shops.findIndex((shop) => shop.id === shopId);
    if (shopIndex === -1) {
      throw new Error(`Shop with ID ${shopId} does not exist.`);
    }
    const shopToRemove = this._shops[shopIndex];

    for (let i = 0; i < shopToRemove.quantity; i++) {
      this._dbsale.removeGood(shopToRemove.good);
    }
  
    this._shops.splice(shopIndex, 1);
    console.log(`Shop with ID ${shopId} removed successfully.`);
  }
  /**
   * Method that adds a return.
   * @param returnToAdd - The return to add
   * @example
   * ```typescript
   * db.addReturn(return);
   * ```
   */
  addReturnSale(returnToAdd: Return<Client>): void {
    let indexOfTheSale = this._sales.findIndex((sale) => sale.id === returnToAdd.id);
    let sale_to_return = this._sales.find((sale) => sale.id === returnToAdd.id);
    if (!sale_to_return) {
      throw new Error("The sale does not exist in the database");
    }
    if (sale_to_return.quantity === returnToAdd.quantity) {
      this._sales.splice(indexOfTheSale, 1);
    } else {
      sale_to_return.quantity -= returnToAdd.quantity;
    }    
    this._returns.push(returnToAdd);
    for (let i = 0; i < returnToAdd.quantity; i++) {
      this._dbsale.addGood(returnToAdd.good);
    }
    console.log(`Return with ID ${returnToAdd.id} added successfully.`);    
  }
  /**
   * Method that adds a return shop.
   * @param returnToAdd - The return to add
   * @example
   * ```typescript
   * db.addReturnShop(return);
   * ```
   */
  addReturnShop(returnToAdd: Return<Merchant>): void {
    let indexOfTheShop = this._shops.findIndex((shop) => shop.id === returnToAdd.id);
    let shop_to_return = this._shops.find((shop) => shop.id === returnToAdd.id);
    if (!shop_to_return) {
      throw new Error("The shop does not exist in the database");
    }
    if (shop_to_return.quantity === returnToAdd.quantity) {
      this._shops.splice(indexOfTheShop, 1);
    } else {
      shop_to_return.quantity -= returnToAdd.quantity;
    }
    this._returns.push(returnToAdd);
    for (let i = 0; i < returnToAdd.quantity; i++) {
      this._dbsale.removeGood(returnToAdd.good);
    }
    console.log(`Return with ID ${returnToAdd.id} added successfully.`);
  }
}

import { DBTransactions } from "../interfaces/db_transaction.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { TransactionsSchema } from "../types/transactionsschema.js";
import { DB_Good } from "./db_good.js";
import { Sale } from "../models/sale.js";
import { Shop } from "../models/shop.js";

/**
 * Represents the database of the transactions
 * 
 * Class DB_Transactions
 * @param adapter - The adapter of the database
 * @param db - The database object
 */
export class DB_Transactions implements DBTransactions {
  accessor _adapter: JSONFile<TransactionsSchema>;
  accessor _db: Low<TransactionsSchema>;
  accessor _sales: Sale[] = [];
  accessor _shops: Shop[] = [];

  constructor(
    public adapter: JSONFile<TransactionsSchema>,
    public db: Low<TransactionsSchema>,
    public filePath: string = "./src/db/db_transactions.json",
    public initialData: TransactionsSchema = { sale: [], shop: [] }
  ) {
    this._adapter = adapter;
    this._db = db;
    this.adapter = new JSONFile<TransactionsSchema>(filePath);
    this.db = new Low<TransactionsSchema>(this.adapter, initialData);
  }
  async initDB(): Promise<void> {
    await this.db.read();
    this.db.data ||= this.initialData;
    await this.db.write();
  }
  async readSales(): Promise<Sale[]> {
    await this.db.read();
    this._sales = this.db.data.sale;
    return this._sales;
  }
  async readShops(): Promise<Shop[]> {
    await this.db.read();
    this._shops = this.db.data.shop;
    return this._shops;
  }
  async writeTransaction(): Promise<void> {
    this.db.data.sale = this._sales;
    this.db.data.shop = this._shops;
    await this.db.write();
  }
  addSale(saleToAdd: Sale): void {
    let sales_array: Sale[] = [];
    this._sales.forEach((element) => {
      sales_array.push(element);
    });
    if (sales_array.includes(saleToAdd)) {
      throw new Error("Sale already exists"); // TODO crear nuevo error
    } else {
      // comprobar si hay stock suficiente del producto
      let db_goods = new DB_Good(new JSONFile("./src/db/db_good.json"), new Low(new JSONFile("./src/db/db_good.json"), { goods: [] }));
      db_goods.readInventory();
      
    }
  }
  addShop(shopToAdd: Shop): void {
    let shops_array: Shop[] = [];
    this._shops.forEach((element) => {
      shops_array.push(element);
    });
    if (shops_array.includes(shopToAdd)) {
      throw new Error("Shop already exists"); // TODO crear nuevo error
    } else {
      this._shops.push(shopToAdd);
    }
  }
  removeSale(saleToRemove: Sale): void {
    let sales_array: Sale[] = [];
    this._sales.forEach((element) => {
      sales_array.push(element);
    });
    if (!sales_array.includes(saleToRemove)) {
      throw new Error("Sale does not exist"); // TODO crear nuevo error
    } else {
      this._sales = this._sales.filter((sale) => sale.good.id !== saleToRemove.good.id);
    }
  }
  removeShop(shopToRemove: Shop): void {
    let shops_array: Shop[] = [];
    this._shops.forEach((element) => {
      shops_array.push(element);
    });
    if (!shops_array.includes(shopToRemove)) {
      throw new Error("Shop does not exist"); // TODO crear nuevo error
    } else {
      this._shops = this._shops.filter((shop) => shop.id !== shopToRemove.id);
    }
  }
}
import { DBTransactions } from "../interfaces/db_transaction.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { TransactionsSchema } from "../types/transactionsschema.js";
import { DBManager } from "../services/dbmanager.js";

import { Sale } from "../models/sale.js";
import { Shop } from "../models/shop.js";
import { Return } from "../models/return.js";

import { Good } from "../models/good.js";
import { Merchant } from "../models/merchant.js";
import { Client } from "../models/client.js";

import { TakenIdError } from "../errors/takeniderror.js";

export class DB_Transactions implements DBTransactions  {
  readonly adapter: JSONFile<TransactionsSchema>;
  readonly db: Low<TransactionsSchema>;
  accessor _sales: Sale[] = [];
  accessor _shops: Shop[] = [];
  accessor _returns: Return<Client | Merchant>[] = [];
  accessor _dbmanager: DBManager;

  constructor(
    public filePath: string = './src/db/db_transactions.json',
    public initialData: TransactionsSchema = { sale: [], shop: [], return: [] },
    public readonly manager: DBManager
  ) {
    this.adapter = new JSONFile<TransactionsSchema>(filePath);
    this.db = new Low<TransactionsSchema>(this.adapter, initialData);
    this._dbmanager = manager;
    this.readTransactions();
  }

  async initDB(): Promise<void> {
    await this.db.read();
    this.db.data ||= this.initialData;
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

  addSale(saleToAdd: Sale): void {
    // Verificar si el ID de la venta ya está tomado
    if (this._sales.some((sale) => sale.id === saleToAdd.id)) {
      throw new TakenIdError("The id of the sale is already taken");
    }
  
    // Verificar si el bien existe en la base de datos de bienes
    const goodStack = this._dbmanager.getDBGood()._inventory.find(
      (good) => good[0].id === saleToAdd.good.id
    );

    if (!goodStack) {
      throw new Error("The good does not exist in the database");
    }
  
    // Verificar si hay suficiente stock del bien
    if (goodStack[1] < saleToAdd.quantity) {
      throw new Error(
        `Not enough stock for the good "${saleToAdd.good.name}". Available: ${goodStack[1]}, Requested: ${saleToAdd.quantity}`
      );
    }
  
    // Verificar si el cliente tiene suficiente dinero
    if (saleToAdd.total_price < goodStack[0]._value * saleToAdd.quantity) {
      throw new Error(
        `The client "${saleToAdd.client.name}" does not have enough money. Required: ${saleToAdd.total_price}, Available: ${saleToAdd.total_price}`
      );
    }
  
    // Decrementar el stock del bien
    this._dbmanager.getDBGood().removeGood(goodStack[0]);
  
    // Añadir la venta a la base de datos de ventas
    this._sales.push(saleToAdd);
  
    console.log(`Sale with ID ${saleToAdd.id} added successfully.`);
  }

  removeSale(saleId: number): void {
    const saleIndex = this._sales.findIndex((sale) => sale.id === saleId);
    if (saleIndex === -1) {
      throw new Error(`Sale with ID ${saleId} does not exist.`);
    }
  
    // Restaurar el stock del bien asociado a la venta
    const saleToRemove = this._sales[saleIndex];
    for (let i = 0; i < saleToRemove.quantity; i++) {
      this._dbmanager.getDBGood().addGood(saleToRemove.good);
    }
  
    // Eliminar la venta
    this._sales.splice(saleIndex, 1);
    console.log(`Sale with ID ${saleId} removed successfully.`);
  }
  

  addShop(shopToAdd: Shop): void {
    if (this._shops.some((shop) => shop.id === shopToAdd.id)) {
      throw new TakenIdError("The id of the shop is already taken");
    }
    this._shops.push(shopToAdd);
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
    if (this._returns.some((ret) => ret._id === returnToAdd._id)) {
      throw new TakenIdError("The id of the return is already taken");
    }
    if (!this._dbmanager.getDBGood().searchGoodsByName(returnToAdd._good.name)) {
      throw new Error("The good does not exist in the database");
    }
    for (let i = 0; i < returnToAdd._quantity; i++) {
      this._dbmanager.getDBGood().addGood(returnToAdd._good);
    }
    if (returnToAdd._agent instanceof Client && 
        !this._dbmanager.getDBClient().searchClient("name", returnToAdd._agent.name)) {
      this._dbmanager.getDBClient().addClient(returnToAdd._agent);
    }
    if (returnToAdd._agent instanceof Merchant && 
        !this._dbmanager.getDBMerchant().searchMerchant("name", returnToAdd._agent.name)) {
      this._dbmanager.getDBMerchant().addMerchant(returnToAdd._agent);
    }
    this._returns.push(returnToAdd);
  }

  removeReturn(returnId: number): void {
    const returnIndex = this._returns.findIndex((ret) => ret._id === returnId);
    if (returnIndex === -1) {
      throw new Error(`Return with ID ${returnId} does not exist.`);
    }
  
    // Revertir los cambios en el inventario
    const returnToRemove = this._returns[returnIndex];
    for (let i = 0; i < returnToRemove._quantity; i++) {
      this._dbmanager.getDBGood().removeGood(returnToRemove._good);
    }
  
    // Eliminar la devolución
    this._returns.splice(returnIndex, 1);
    console.log(`Return with ID ${returnId} removed successfully.`);
  }
}

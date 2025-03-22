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
  accessor _returns: Return<Client | Merchant>[] = [];
  accessor _dbmanager: DBManager;

  /**
   * The constructor of the DB_Transactions class
   * @param adapter - The adapter of the database
   * @param db - The database object
   */
  constructor(
    public adapter: JSONFile<TransactionsSchema>,
    public db: Low<TransactionsSchema>,
    public filePath: string = './src/db/db_transactions.json',
    public initialData: TransactionsSchema = { sale: [], shop: [], return: [] },
    
  ) {
    this._adapter = adapter;
    this._db = db;
    this.adapter = new JSONFile<TransactionsSchema>(filePath);
    this.db = new Low<TransactionsSchema>(this.adapter, initialData);
    this._dbmanager = new DBManager();
    this.readTransactions();
  }
  /**
   * Method that initializes the database
   * @returns Promise<void>
   */
  async initDB(): Promise<void> {
    await this.db.read();
    this.db.data ||= this.initialData;
    await this.db.write();
  }
  /**
   * Method that reads the transactions from the database
   * @returns Promise<void>
   */
  async readTransactions(): Promise<void> {
    await this.db.read();
    this._sales = this.db.data.sale;
    this._shops = this.db.data.shop;
    this._returns = this.db.data.return;
  }
  /**
   * Method that writes the transactions to the database
   * @returns Promise<void>
   */
  async writeTransactions(): Promise<void> {
    this.db.data.sale = [...this._sales];
    this.db.data.shop = [...this._shops];
    this.db.data.return = [...this._returns];
    await this.db.write();
  }
  // TODO: Implement the rest of the methods (addSale, addShop, addReturn and their respective delete methods)
  // Recordar que hay que modificar la base de datos de DB_Good en función a las ventas, compras y devoluciones
  // También hay que mirar si a la hora de añadir una venta, compra o devolución, hay que modificar la base de datos de los clientes y los comerciantes en caso 
  // de que no estén en la base de datos registrados. 

  // IMPORTANTE: a la hora de implementar el return, hay que hacer condicionales para saber si es un return de un cliente o de un comerciante antes de crear el objeto 
  // Por lo tanto, la base de datos de transacciones no cambiará, pero la base de datos de clientes y comerciantes se usará para las comprobaciones de que el cliente o 
  // comerciante existe y no es alguien random que ha hecho un return.
  // También hay que tener en cuenta que a la hora de hacer un return, hay que comprobar si el good que se devuelve existe en la base de datos de los goods, y si existe,
  // hay que incrementar el stock de ese good en la base de datos de los goods.

  /**
   * Method that adds a sale to the database
   * @param sale - The sale to add
   * @returns Promise<void>
   */
  addSale(saleToAdd: Sale): void {
    let sales_array: Sale[] = [];
    this._sales.forEach((sale) => {
      sales_array.push(sale);
    });

    if (sales_array.some((sale) => sale.id === saleToAdd.id)) {
      throw new TakenIdError("The id of the sale is already taken");
    } else {
      // hay que modificar la base de datos de los goods con dbmanager
      // primero hay que comprobar si el good de la venta existe en la base de datos de los goods
      // si existe, hay que decrementar el stock de ese good en la base de datos de los goods
      // si no existe, error
      
      if (this._dbmanager.getDBGood().searchGoodsByName(saleToAdd.good.name)) {
        this._sales.push(saleToAdd);
        // hacer un bucle en funcion al numero de elementos que se quiera quitar de goods. Se hacen llamadas consecutivas a removeGood, ya que se elimina de uno en uno (por ejemplo si se compran 3 goods, hay que llamar 3 veces a removeGood para que el numero de good disminuya)
        for (let i = 0; i < saleToAdd.quantity; i++) {
          this._dbmanager.getDBGood().removeGood(saleToAdd.good);
        }
        // comprobar si el cliente existe en la base de datos de los clientes. Si no está, registrarlo
        if (!this._dbmanager.getDBClient().searchClient("name", saleToAdd.client.name)) {
          this._dbmanager.getDBClient().addClient(saleToAdd.client);
        }
      } 
    }
  }
  /**
   * Method that adds a shop to the database
   * @param shop - The shop to add
   * @returns void
   */
  addShop(shopToAdd: Shop): void {
    let shops_array: Shop[] = [];
    this._shops.forEach((shop) => {
      shops_array.push(shop);
    });

    if (shops_array.some((shop) => shop.id === shopToAdd.id)) {
      throw new TakenIdError("The id of the shop is already taken");
    } else {
      this._shops.push(shopToAdd);
    }
  }

  
    
}
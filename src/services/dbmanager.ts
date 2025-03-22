import { DB_Good } from "../db/db_good.js";
import { DB_Merchant } from "../db/db_merchants.js";
import { DB_Client } from "../db/db_clients.js";
// import { Good } from "../models/good.js";
// import { Merchant } from "../models/merchant.js";
// import { Client } from "../models/client.js";
import { GoodSchema } from "../types/goodschema.js";
import { MerchantSchema } from "../types/merchantschema.js";
import { ClientSchema } from "../types/clientschema.js";
import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";


/**
 * Class that manages the database of the application.
 * It is responsible for initializing the database and managing the inventory of goods.
 * 
 * class DBManager
 */
export class DBManager {
  private db_good: DB_Good;
  private db_merchant: DB_Merchant;
  private db_client: DB_Client;

  /**
   * Construct the dbmanager object and initializes every database
   */
  constructor() {
    this.db_good = new DB_Good(new JSONFile<GoodSchema>('./src/db/db_good.json'), new Low<GoodSchema>(new JSONFile<GoodSchema>('./src/db/db_good.json'), { goods: [] }));
    this.db_merchant = new DB_Merchant(new JSONFile<MerchantSchema>('./src/db/db_merchants.json'), new Low<MerchantSchema>(new JSONFile<MerchantSchema>('./src/db/db_merchant.json'), { merchant: [] }));
    this.db_client = new DB_Client(new JSONFile<ClientSchema>('./src/db/db_clients.json'), new Low<ClientSchema>(new JSONFile<ClientSchema>('./src/db/db_clients.json'), { clients: [] }));
  }

  /** 
   * Returns the database of goods.
   * @returns The database of goods.
   * @example
   * ```typescript
   * const db_good = dbmanager.getDBGood();
   * ```
   */
  getDBGood(): DB_Good {
    return this.db_good;
  }
  /**
   * Return the database of merchants
   * @returns The database of merchants
   * @example
   * ```typescript
   * const db_merchant = dbmanager.getDBMerchant();
   * ```
   */
  getDBMerchant(): DB_Merchant {
    return this.db_merchant;
  }

  /**
   * Returns the database of clients.
   * @returns The database of clients.
   * @example
   * ```typescript
   * const db_client = dbmanager.getDBClient();
   * ```
   */
  getDBClient(): DB_Client {
    return this.db_client;
  }

  /**
   * Method that saves all the info allocated in memory on each database
   * Will be called when the App is called to close
   */
  saveAll() {
    this.db_good.writeInventory();
    this.db_merchant.writeInventory();
    this.db_client.writeInventory();
  }

}
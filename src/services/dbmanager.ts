import { DB_Good } from "../db/db_good.js";
import { Good } from "../models/good.js";
// import { Merchant } from "../models/merchant.js";
// import { Client } from "../models/client.js";
import { GoodSchema } from "../types/goodschema.js";
import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { TakenIdError } from "../errors/takeniderror.js";
import { GoodStack } from "../types/goodstack.js";



/**
 * Class that manages the database of the application.
 * It is responsible for initializing the database and managing the inventory of goods.
 * 
 * class DBManager
 */
export class DBManager {
  private db_good: DB_Good;
  // private db_merchant: DB_Merchant;
  // private db_client: DB_Client;
  // accessor _client_id: number[];
  // accessor _merchant_id: number[];
  accessor _good_id: number[] = [];
  constructor() {
    // const adaptader = new JSONFile<GoodSchema>('./src/db/db_good.json');
    // const db = new Low<GoodSchema>(adaptader, { goods: [] });
    // this._db_good = new DB_Good(adaptader, db);
    this.db_good = new DB_Good(new JSONFile<GoodSchema>('./src/db/db_good.json'), new Low<GoodSchema>(new JSONFile<GoodSchema>('./src/db/db_good.json'), { goods: [] }));
    // this._db_merchant = new DB_Merchant(new JSONFile<MerchantSchema>('./src/db/db_merchant.json'), new Low<MerchantSchema>(new JSONFile<MerchantSchema>('./src/db/db_merchant.json'), { merchant: [] }));
    // this._db_client = new DB_Client(new JSONFile<ClientSchema>('./src/db/db_client.json'), new Low<ClientSchema>(new JSONFile<ClientSchema>('./src/db/db_client.json'), { client: [] }));
    // this._client_id = [];
    // this._merchant_id = [];
    this.loadGoodId();
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
   * Initializes the database.
   * It is called when the application starts.
   * @example
   * ```typescript
   * await dbmanager.initDB();
   * ```
   */
  async initDB(): Promise<void> {
    await this.db_good.initDB();
  }

  /**
   * Loads the goods from the database.
   * It is called when the application starts.
   * @example
   * ```typescript
   * dbmanager.loadGoods();
   */
  loadGoodId(): void {
    this.db_good.readInventory();
    this.db_good._inventory.forEach((good) => {
      this._good_id.push(good[0].id);
    });  
  }

  /**
   * Adds a good to the inventory.
   * If the good is already in the inventory, it adds one to the quantity.
   * If the good is not in the inventory, it adds it to the inventory with a quantity of 1.
   * @param goodToAdd - The good to add to the inventory.
   * @throws TakenIdError - If the id of the good is already taken.
   */
  addGood(goodToAdd: Good): void {
    // comprobar si esta dentro de _inventory. Descerializar el objeto y comprobar el id del objeto
    let goods_array: Good[] = [];

    this.db_good._inventory.forEach((good) => {
      goods_array.push(good[0]);
    });
    
    if (goods_array.includes(goodToAdd)) {
      console.log("The good is already in the inventory");
      // add one to the inventory
      this.db_good._inventory.forEach((good) => {
        if (good[0].id === goodToAdd.id) {
          good[1]++;
        }
      });
    } else if (goods_array.some((good) => good.id === goodToAdd.id && good.name !== goodToAdd.name)) {
      console.log("The id is already taken");
      TakenIdError.validate(goodToAdd.id, this._good_id);
      // throw new AppError(`Good with id ${goodToAdd.id} already exists with a different name.`);
    } else {
      console.log("The good is not in the inventory");
      let addedGood: GoodStack = [goodToAdd, 1];
      this.db_good._inventory.push(addedGood);
    }
  }

  /**
   * Removes a good from the inventory.
   * If the good is in the inventory, it removes one from the quantity.
   * If the quantity is 0, it removes the good from the inventory.
   * @param goodToRemove - The good to remove from the inventory.
   * @throws TakenIdError - If the id of the good is already taken.
   */
  removeGood(goodToRemove: Good): void {
    // comprobar si esta dentro de _inventory. Descerializar el objeto y comprobar el id del objeto
    let goods_array: Good[] = [];

    this.db_good._inventory.forEach((good) => {
      goods_array.push(good[0]);
    });
    
    if (goods_array.includes(goodToRemove)) {
      // remove one to the inventory
      this.db_good._inventory.forEach((good) => {
        if (good[0].id === goodToRemove.id) {
          good[1]--;
        }
      });
    } else {
      console.log("The good is not in the inventory");
    }
  }
}
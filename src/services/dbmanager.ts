import { DB_Good } from "../db/db_good.js";
import { Good } from "../models/good.js";
// import { Merchant } from "../models/merchant.js";
// import { Client } from "../models/client.js";
import { GoodSchema } from "../types/goodschema.js";
import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { TakenIdError } from "../errors/takeniderror.js";

// import { GoodStack } from "../types/goodstack.js";




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
  async initDB(): Promise<void> {
    await this.db_good.initDB();
  }
  loadGoodId(): void {
    this.db_good.readInventory();
    this.db_good.inventory.forEach((good) => {
      this._good_id.push(good[0].id);
    });  
  }
  addGood(goodToAdd: Good): void {
    // comprobar si esta dentro de _inventory. Descerializar el objeto y comprobar el id del objeto
    let goods_array: Good[] = [];

    this.db_good._inventory.forEach((good) => {
      goods_array.push(good[0]);
    });
    
    if (goods_array.includes(goodToAdd)) {
      // add one to the inventory
      this.db_good._inventory.forEach((good) => {
        if (good[0].id === goodToAdd.id) {
          good[1]++;
        }
      });
    } else {
      // if the id is already taken
      if(this._good_id.includes(goodToAdd.id)) {
        TakenIdError.validate(goodToAdd.id, this._good_id);
      } else {
        this.db_good._inventory.push([goodToAdd, 1]);
      }
    }
  }
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
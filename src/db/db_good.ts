import { DBGood } from "../interfaces/db_good.js";
import { GoodSchema } from "../types/goodschema.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { GoodStack } from "../types/goodstack.js";

/**
 * This class is used to represent the database for the goods
 * 
 * DBGood class
 * @param adapter - The JSON file adapter
 * @param db - The LowDB instance
 */

export class DB_Good implements DBGood {
  accessor _adapter: JSONFile<GoodSchema>;
  accessor _db: Low<GoodSchema>;
  accessor _inventory: GoodStack[] = [];

  constructor(
    public adapter: JSONFile<GoodSchema>,
    public db: Low<GoodSchema>,
    public filePath: string = "./src/db/db_good.json",
    public initialData: GoodSchema = { goods: [] },
  ) {
    this._adapter = adapter;
    this._db = db;
    this.adapter = new JSONFile<GoodSchema>(filePath);
    this.db= new Low<GoodSchema>(this.adapter, initialData);
    // llamar al metodo read para leer el archivo y hacer los objetos tipo GoodStack y meterlos en el array inventory
    this.readInventory();

  }
  async initDB(): Promise<void> {
    await this.db.read();
    this.db.data ||= this.initialData;
    await this.db.write();
  }
  async readInventory(): Promise<void> {
    await this.db.read();
    this._inventory = this.db.data.goods;
  }
  async writeInventory(): Promise<void> {
    await this.db.read();
    this.db.data.goods = this._inventory;
    await this.db.write();
  }

};
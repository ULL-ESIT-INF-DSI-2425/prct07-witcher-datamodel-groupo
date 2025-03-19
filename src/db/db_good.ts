import { DBGood } from "../interfaces/db_good.js";
import { GoodSchema } from "../types/goodschema.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

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

  constructor(
    public adapter: JSONFile<GoodSchema>,
    public db: Low<GoodSchema>,
    public filePath: string = "./src/db/db_good.json",
    public initialData: GoodSchema = { goods: [] }
  ) {
    this._adapter = adapter;
    this._db = db;
    this.adapter = new JSONFile<GoodSchema>(filePath);
    this.db= new Low<GoodSchema>(this.adapter, initialData);
  }
  async initDB(): Promise<void> {
    await this.db.read();
    this.db.data ||= this.initialData;
    await this.db.write();
  }
};
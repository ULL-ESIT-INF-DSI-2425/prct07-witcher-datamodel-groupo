import { DBGood } from "../interfaces/db_good.js";
import { GoodSchema } from "../types/goodschema.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { GoodStack } from "../types/goodstack.js";

/**
 * This class is used to represent the database for the goods
 * 
 * DBGood class
 */
export class DB_Good implements DBGood {
  accessor _adapter: JSONFile<GoodSchema>;
  accessor _db: Low<GoodSchema>;
  accessor _inventory: GoodStack[] = [];

  /**
   * The constructor for the DB_Good class
   * @param adapter - The JSON file adapter
   * @param db - The LowDB instance
   * @param filePath - The path to the JSON file
   * @param initialData - The initial data for the database
   */
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
    this.readInventory();
  }

  /**
   * The method to initialize the database
   * @returns Promise<void>
   */
  async initDB(): Promise<void> {
    await this.db.read();
    this.db.data ||= this.initialData;
    await this.db.write();
  }

  /**
   * The method to read the inventory and save it in the _inventory property
   */
  async readInventory(): Promise<void> {
    await this.db.read();
    this._inventory = this.db.data.goods;
  }

  /**
   * The method to write the inventory to the database
   */
  async writeInventory(): Promise<void> {
    // juntar lo que hay en el _inventory con lo que hay en la base de datos
    this.db.data.goods = this._inventory;
    await this.db.write();
  }

};
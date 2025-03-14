
import { DBInventory } from "../interfaces/db_inventory.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { InventorySchema } from "../types/inventoryschema.js";

/**
 * Represents the database of the inventory
 * 
 * Class DB_Inventory
 * @param adaptader - The adapter of the database
 * @param db - The database object
 */
export class DB_Inventory implements DBInventory {
  public adapter: JSONFile<InventorySchema>;
  public db: Low<InventorySchema>;

  /**
   * The constructor of the class
   * @param filePath - Route of the database.json 
   * @param initialData - the first data we want to insert in the database.json
   */
  constructor(
    public filePath: string = "./src/db/db_inventory.json",
    public initialData: InventorySchema = { goods: [], merchants: [], clients: [] }
  ) {
    this.adapter = new JSONFile<InventorySchema>(filePath);
    this.db = new Low<InventorySchema>(this.adapter, initialData);
  }

  /**
   * An method to initilizate the database
   * @returns A promise with the initialization of the database
   */
  async initDB(): Promise<void> {
    await this.db.read();
    this.db.data ||= this.initialData;
    await this.db.write();
  }
}
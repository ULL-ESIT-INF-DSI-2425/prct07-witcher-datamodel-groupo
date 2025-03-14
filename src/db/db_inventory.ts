
import { DBInventory } from "../interfaces/db_inventory.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { InventorySchema } from "../types/inventoryschema.js";

export class DB_Inventory implements DBInventory {
  public adapter: JSONFile<InventorySchema>;
  public db: Low<InventorySchema>;

  constructor(
    public filePath: string = "./src/db/db_inventory.json",
    public initialData: InventorySchema = { goods: [] }
  ) {
    this.adapter = new JSONFile<InventorySchema>(filePath);
    this.db = new Low<InventorySchema>(this.adapter, initialData);
  }

  async initDB(): Promise<void> {
    await this.db.read();
    this.db.data ||= this.initialData;
    await this.db.write();
  }
}
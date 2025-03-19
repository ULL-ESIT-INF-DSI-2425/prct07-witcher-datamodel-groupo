import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { InventorySchema } from "../types/inventoryschema.js";

/**
 * This interface is used to define the structure of the database for the inventory
 * 
 * DBInventory interface
 * @param adapter - The JSON file adapter
 * @param db - The LowDB instance
 */
export interface DBInventory {
  adapter: JSONFile<InventorySchema>;
  db: Low<InventorySchema>;
}
// DELETE
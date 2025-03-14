import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { InventorySchema } from "../types/inventoryschema.js";

export interface DBInventory {
  adapter: JSONFile<InventorySchema>;
  db: Low<InventorySchema>;
}

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { DataSchema } from "../types/dataschema.js";

/**
 * This interface is used to define the structure of the database
 * 
 * DB interface
 * @param adapter - The JSON file adapter
 * @param db - The LowDB instance
 */
export interface DB {
  adapter: JSONFile<DataSchema>;
  db: Low<DataSchema>;
}
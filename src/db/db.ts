import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { DataSchema } from "../types/dataschema.js";

/**
 * Adapter to interact with JSON file
 */
const adapter = new JSONFile<DataSchema>("./src/db/db.json");

/**
 * Initial state for the database
 */
const initialData: DataSchema = {
  goods: [],
  merchants: [],
  customers: [],
  transactions: [],
};

/**
 * Database instance
 */
export const db = new Low<DataSchema>(adapter, initialData);

/**
 * Initialize the database
 */
export async function initDB() {
  await db.read();
  db.data ||= initialData; // If the file is empty, use the initial data
  await db.write();
}


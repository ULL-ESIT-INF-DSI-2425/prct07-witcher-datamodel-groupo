import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { DataSchema } from "../types/dataschema.js";

/**
 * create a JSON Database file on root 
 */
const adapter = new JSONFile<DataSchema>("../../db.json");

/**
 * the initial data of the database
 */
const initial: DataSchema = {
  goods: [],
  merchants: [],
  customers: [],
  transactions: [],
};

/**
 * db is the database object that will be used to interact with the database file
 */
export const db = new Low<DataSchema>(adapter, initial);

/**
 * initDB is a function that initializes the database.
 * It reads the database file and writes it back to the file in a synchronous way.
 */
export async function initDB() {
  await db.read();
  await db.write();
}

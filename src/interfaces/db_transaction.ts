import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { TransactionsSchema } from "../types/transactionsschema.js";

/**
 * This interface is used to define the structure of the database for the transactions
 * 
 * DBTransactions interface
 * @param adapter - The JSON file adapter
 * @param db - The LowDB instance
 */

export interface DBTransactions {
  adapter: JSONFile<TransactionsSchema>;
  db: Low<TransactionsSchema>;
}
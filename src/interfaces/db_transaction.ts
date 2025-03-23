import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { TransactionsSchema } from "../types/transactionsschema.js";

/**
 * Interface for the Transactions Database
 * 
 * DBTransactions interface
 * @param adapter - The JSON file adapter
 * @param db - The LowDB instance
 */
export interface DBTransactions {
  adapter: JSONFile<TransactionsSchema>;
  db: Low<TransactionsSchema>;
}
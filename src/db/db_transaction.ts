import { DBTransactions } from "../interfaces/db_transaction.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { TransactionsSchema } from "../types/transactionsschema.js";

/**
 * Represents the database of the transactions
 * 
 * Class DB_Transactions
 * @param adapter - The adapter of the database
 * @param db - The database object
 */
export class DB_Transactions implements DBTransactions {
  accessor _adapter: JSONFile<TransactionsSchema>;
  accessor _db: Low<TransactionsSchema>;

  constructor(
    public adapter: JSONFile<TransactionsSchema>,
    public db: Low<TransactionsSchema>,
    public filePath: string = "./src/db/db_transactions.json",
    public initialData: TransactionsSchema = { sale: [], shop: [] }
  ) {
    this._adapter = adapter;
    this._db = db;
    this.adapter = new JSONFile<TransactionsSchema>(filePath);
    this.db = new Low<TransactionsSchema>(this.adapter, initialData);
  }
  async initDB(): Promise<void> {
    await this.db.read();
    this.db.data ||= this.initialData;
    await this.db.write();
  }
}
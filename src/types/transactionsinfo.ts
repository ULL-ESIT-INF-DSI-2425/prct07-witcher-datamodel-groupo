import { Good } from "../models/good.js";

/**
 * Type that represents the schema for the transactions in transaction.json file
 */
export type TransactionsInfo = {
  good: Good;
  quantity: number;
  total_price: number;
  date: Date;

  getTransactionType(): string;
};
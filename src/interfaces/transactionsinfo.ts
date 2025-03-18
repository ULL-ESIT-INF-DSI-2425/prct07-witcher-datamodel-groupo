import { Good } from "../models/good.js";

/**
 * Represents the schema of the transactions information
 */
export type TransactionsInfo = {
  good: Good;
  quantity: number;
  total_price: number;
  date: Date;

  getTransactionType(): string;
};
import { Sale } from "../models/sale.js";
import { Shop } from "../models/shop.js";

/**
 * Represents the schema of the transactions information
 */
export type TransactionsSchema = {
  sale: Sale[];
  shop: Shop[];
};




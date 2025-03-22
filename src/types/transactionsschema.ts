import { Sale } from "../models/sale.js";
import { Shop } from "../models/shop.js";
import { Return } from "../models/return.js";
import { Client } from "../models/client.js";
import { Merchant } from "../models/merchant.js";
/**
 * Represents the schema of the transactions information
 */
export type TransactionsSchema = {
  sale: Sale[];
  shop: Shop[];
  return: Return<Client | Merchant>[];

};




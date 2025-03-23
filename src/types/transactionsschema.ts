import { Sale } from "../models/sale.js";
import { Shop } from "../models/shop.js";
import { Return } from "../models/return.js";
import { Client } from "../models/client.js";
import { Merchant } from "../models/merchant.js";
/**
 * Type that represents the schema for the transactions in transaction.json file
 */
export type TransactionsSchema = {
  sale: Sale[];
  shop: Shop[];
  return: Return<Client | Merchant>[];

};




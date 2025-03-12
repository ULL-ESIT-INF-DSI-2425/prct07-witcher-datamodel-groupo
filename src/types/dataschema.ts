import { Good } from "../models/good.js";
import { Merchant } from "../models/merchant.js";
import { Client } from "../models/client.js";

/**
 * DataSchema is the schema of the database file
 */
export type DataSchema = {
  goods: Good[];
  merchants: Merchant[];
  customers: Client[];
  transactions: number[];
};

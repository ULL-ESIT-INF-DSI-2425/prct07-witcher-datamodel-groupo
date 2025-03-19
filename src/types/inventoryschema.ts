import { Good } from "../models/good.js";
import { Merchant } from "../models/merchant.js";
import { Client } from "../models/client.js";

/**
 * Represents the schema of the inventory
 */
export type InventorySchema = {
  goods: Good[];
  merchant: Merchant[];
  client: Client[];

};

// DELETE
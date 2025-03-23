import { Merchant } from "../models/merchant.js";

/**
 * Type that represents the schema for the merchants in merchants.json file
 */
export type MerchantSchema = {
  merchant: Merchant[];
};
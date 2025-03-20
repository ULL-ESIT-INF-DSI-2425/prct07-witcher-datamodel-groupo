import { Merchant } from "../models/merchant.js";

/**
 * MerchantSchema is a type that represents the structure of the JSON file that contains the merchants.
 */
export type MerchantSchema = {
  merchant: Merchant[];
};
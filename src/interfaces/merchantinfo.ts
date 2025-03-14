import { Locations } from "../enums/locations.js";
import { MerchantType } from "../enums/merchantType.js";

/**
 * Interface that holds the information of a Merchant
 *
 * Merchant Info
 * @param id - The id of the merchant
 * @param name - The name of the merchant
 * @param type - The type of the merchant
 * @param location - The location of the merchant
 */
export interface MerchantInfo {
  id: number;
  name: string;
  type: MerchantType;
  location: Locations;
}

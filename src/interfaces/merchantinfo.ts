import { Locations } from "../enums/locations.js";
import { MerchantType } from "../enums/type.js";

/**
 * Interface that holds the information of a Merchant
 *
 * Merchant Info
 */
export interface MerchantInfo {
  id: number;
  name: string;
  type: MerchantType;
  location: Locations;
}

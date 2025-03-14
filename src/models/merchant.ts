import { MerchantInfo } from "../interfaces/merchantinfo.js"
import { Locations } from "../enums/locations.js"
import { MerchantType } from "../enums/merchantType.js"
import { MerchantError } from "../errors/merchanterror.js"
import { LocationError } from "../errors/locationerror.js"
import { IdError } from "../errors/iderror.js"

/**
 * Represents a Merchant type object and its information
 * 
 * Class Merchant
 */
export class Merchant implements MerchantInfo {
  /**
   * Constructs a Merchant object
   * @param id - identification of the Merchant (number)
   * @param name - name of the Merchant (string)
   * @param type - type of job of the Merchant (string)
   * @param location - place of origin of Merchant (string)
   * @throws IdError if the id is invalid
   * @throws MerchantError if the type is invalid
   * @throws LocationError if the location is invalid
   */
  constructor(
    public id: number,
    public name: string,
    public type: MerchantType,
    public location: Locations
  ) {
    IdError.validate(this.id);
    MerchantError.validate(this.type);
    LocationError.validate(this.location);
  }
}

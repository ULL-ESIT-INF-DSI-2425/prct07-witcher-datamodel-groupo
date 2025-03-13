import { MerchantInfo } from "../interfaces/merchantinfo.js"
import { Locations } from "../enums/locations.js"
import { MerchantType } from "../enums/merchantType.js"

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
   */
  constructor(
    public id: number,
    public name: string,
    // TODO: gestion de errores Tipo y Localizaciones
    public type: MerchantType,
    public location: Locations
  ) {}
}

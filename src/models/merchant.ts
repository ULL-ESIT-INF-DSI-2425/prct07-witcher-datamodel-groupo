
/**
 * Represents a Merchant type object and its information
 * 
 * Class Merchant
 */
export class Merchant {
  /**
   * Constructs a Merchant object
   * @param id - identification of the Merchant (number)
   * @param name - name of the Merchant (string)
   * @param type - type of job of the Merchant (string)
   * @param location - place of origin of Merchant (string)
   */
  constructor(
    public id: string,
    public name: string,
    public type: string,
    public location: string
  ) {}
}

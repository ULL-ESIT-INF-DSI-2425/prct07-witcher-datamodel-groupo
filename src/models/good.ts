import { GoodInfo } from "../interfaces/goodinfo.js";
import { Materials } from "../enums/materials.js";

/**
 * Represents a Good type object with its information
 *
 * Class Good
 */
export class Good implements GoodInfo {
  /**
   * Constructs a Good type object
   * @param id - identification number of the good (number)
   * @param name - name of the good (string)
   * @param description - description with the origin and use of the good (string)
   * @param material - materials that makes the good (Materials enum)
   * @param weight - weight of the good (number)
   * @param value - value in Crowns of the good (number)
   */
  constructor(
    public id: number,
    public name: string,
    public description: string,
    // TODO: en caso de que el material no este en Materials, throw error
    public material: Materials,
    public weight: number,
    public value: number,
  ) {}
}

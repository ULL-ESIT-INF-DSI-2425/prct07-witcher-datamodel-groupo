import { GoodInfo } from "../intefaces/goodinfo.js";

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
   * @param material - material that makes the good (string)
   * @param weight - weight of the good (number)
   * @param value - value in Crowns of the good (number)
   */
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public material: string,
    public weight: number,
    public value: number,
  ) {}
}

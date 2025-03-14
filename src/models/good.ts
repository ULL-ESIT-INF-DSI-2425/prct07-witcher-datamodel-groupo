import { GoodInfo } from "../interfaces/goodinfo.js";
import { Materials } from "../enums/materials.js";
import { MaterialError } from "../errors/materialerror.js";
import { IdError } from "../errors/iderror.js";


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
   * @throws MaterialError if the material is not a valid Materials enum value
   * @throws IdError if the id is invalid
   */
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public material: Materials,
    public weight: number,
    public value: number,
  ) {
    MaterialError.validate(this.material);
    IdError.validate(this.id);
  }
}

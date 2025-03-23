import { GoodInfo } from "../interfaces/goodinfo.js";
import { Materials } from "../enums/materials.js";
import { MaterialError } from "../errors/materialerror.js";
import { IdError } from "../errors/iderror.js";


/**
 * Represents a Good type object with its information
 *
 * Class Good
 * @param _id - identification number of the good (number)
 * @param _name - name of the good (string)
 * @param _description - description with the origin and use of the good (string)
 * @param _material - materials that makes the good (Materials enum)
 * @param _weight - weight of the good (number)
 * @param _value - value in Crowns of the good (number)
 */
export class Good implements GoodInfo {
  accessor _id: number;
  accessor _name: string;
  accessor _description: string;
  accessor _material: Materials;
  accessor _weight: number;
  accessor _value: number;
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
    this._id = id;
    this._name = name;
    this._description = description;
    this._material = material;
    this._weight = weight;
    this._value = value;
    MaterialError.validate(this._material);
    IdError.validate(this._id);
  }
}

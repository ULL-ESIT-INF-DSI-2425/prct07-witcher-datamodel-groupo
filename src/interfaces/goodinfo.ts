import { Materials } from "../enums/materials.js";
/**
 * Interface that holds the information of a Good
 *
 * Interface GoodInfo
 * @param id - The id of the good
 * @param name - The name of the good
 * @param description - The description of the good
 * @param material - The material of the good
 * @param weight - The weight of the good
 * @param value - The value of the good
 */
export interface GoodInfo {
  id: number;
  name: string;
  description: string;
  material: Materials;
  weight: number;
  value: number;
}

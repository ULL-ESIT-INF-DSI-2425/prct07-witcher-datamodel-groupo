import { Materials } from "../enums/materials.js";
/**
 * Interface that holds the information of a Good
 *
 * Interface GoodInfo
 */
export interface GoodInfo {
  id: number;
  name: string;
  description: string;
  material: Materials;
  weight: number;
  value: number;
}

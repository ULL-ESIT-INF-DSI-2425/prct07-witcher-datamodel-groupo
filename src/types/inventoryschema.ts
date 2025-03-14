import { Good } from "../models/good.js";

export type InventorySchema = {
  goods: Good[];
};
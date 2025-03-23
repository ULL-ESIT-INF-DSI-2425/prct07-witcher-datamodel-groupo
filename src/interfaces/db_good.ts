import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { GoodSchema } from "../types/goodschema.js";

/** 
 * Interface for the Good database
 * 
 * Interface DBGood
 * @param adapter - JSONFile<GoodSchema>
 * @param db - Low<GoodSchema>
 */
export interface DBGood {
  adapter: JSONFile<GoodSchema>;
  db: Low<GoodSchema>;
}

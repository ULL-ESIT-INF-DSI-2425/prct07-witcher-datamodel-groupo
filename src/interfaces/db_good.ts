import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { GoodSchema } from "../types/goodschema.js";

export interface DBGood {
  adapter: JSONFile<GoodSchema>;
  db: Low<GoodSchema>;
}

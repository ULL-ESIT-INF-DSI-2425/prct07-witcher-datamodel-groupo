
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { DataSchema } from "../types/dataschema.js";

export interface DB {
  adapter: JSONFile<DataSchema>;
  db: Low<DataSchema>;
}
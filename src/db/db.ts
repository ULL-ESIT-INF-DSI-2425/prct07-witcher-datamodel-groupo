import {JSONFile, Low} from "lowdb";
import { Good } from "../models/good.js";
import { Merchant } from "../models/merchant.js";
import { Client } from "../models/client.js";

export type DataSchema = {
  goods: Good[];
  merchants: Merchant[];
  customers: Client[];
  transactions: number[];
}

const adapter = new JSONFile<DataSchema>('./db.json');
export const db = new Low<DataSchema>(adapter);

export async function initDB() {
  await db.read();
  db.data ||= { goods: [], merchants: [], customers: [], transactions: [] };
  await db.write();
}

el copilot escribiendo poesiapic.twitter.com/1Z6Z6Z2Q2v
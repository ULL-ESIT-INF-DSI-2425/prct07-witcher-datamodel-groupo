import { Client } from "../models/client.js";

/**
 * Interface that represents the schema for the clients.json file
 */
export type ClientSchema = {
  clients: Client[];
};
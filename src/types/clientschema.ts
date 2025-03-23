import { Client } from "../models/client.js";

/**
 * Type that represents the schema for the clients in clients.json file
 */
export type ClientSchema = {
  clients: Client[];
};
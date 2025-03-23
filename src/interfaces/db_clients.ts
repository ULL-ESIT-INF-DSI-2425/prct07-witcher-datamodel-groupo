import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { ClientSchema } from '../types/clientschema.js';

/** 
 * Interface for the Client database
 * 
 * Interface DBClient
 * @param adapter - JSONFile<ClientSchema>
 * @param db - Low<ClientSchema>
 */
export interface DBClient {
  adapter: JSONFile<ClientSchema>;
  db: Low<ClientSchema>;
}
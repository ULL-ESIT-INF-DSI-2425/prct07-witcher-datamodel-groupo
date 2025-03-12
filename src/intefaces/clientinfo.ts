import { Races } from "../enums/races.js";

/**
 * Interface that holds the information of a Client
 *
 * Interface ClientInfo
 */
export interface ClientInfo {
  id: number;
  name: string;
  race: Races;
  location: string;
}

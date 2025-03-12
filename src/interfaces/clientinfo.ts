import { Races } from "../enums/races.js";
import { Locations } from "../enums/locations.js";

/**
 * Interface that holds the information of a Client
 *
 * Interface ClientInfo
 */
export interface ClientInfo {
  id: number;
  name: string;
  race: Races;
  location: Locations;
}

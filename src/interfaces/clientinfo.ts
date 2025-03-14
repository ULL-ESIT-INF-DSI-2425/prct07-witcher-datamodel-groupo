import { Races } from "../enums/races.js";
import { Locations } from "../enums/locations.js";

/**
 * Interface that holds the information of a Client
 *
 * Interface ClientInfo
 * @param id - The id of the client
 * @param name - The name of the client
 * @param race - The race of the client
 * @param location - The location of the client
 */
export interface ClientInfo {
  id: number;
  name: string;
  race: Races;
  location: Locations;
}

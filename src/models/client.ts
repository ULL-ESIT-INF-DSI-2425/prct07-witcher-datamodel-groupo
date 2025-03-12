import { Races } from "../enums/races.js";
import { ClientInfo } from "../intefaces/clientinfo.js";

/**
 * Represents a Client of the Inn
 *
 * Class Client
 */
export class Client implements ClientInfo {
  /**
   * Construct a Client type object
   * @param id - identification number of the Client (number)
   * @param name - name of the Client (string)
   * @param race - race of the Client (Race enum)
   * @param location - place of origin of the Client (string)
   */
  constructor(
    public id: number,
    public name: string,
    public race: Races,
    public location: string,
  ) {}
}

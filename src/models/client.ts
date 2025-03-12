import { Races } from "../enums/races.js";
import { Locations } from "../enums/locations.js";
import { ClientInfo } from "../interfaces/clientinfo.js";

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
   * @param race - race of the Client (Races enum)
   * @param location - place of origin of the Client (Locations Enum)
   */
  constructor(
    public id: number,
    public name: string,
    // TODO: gestion de errores de Raza y Localizacion
    public race: Races,
    public location: Locations,
  ) {}
}

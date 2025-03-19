import inquirer from "inquirer";
import { Races } from "../../enums/races.js";
import { Locations } from "../../enums/locations.js";

/**
 * Function to add a client
 *
 * addClient
 * @example
 * ```typescript
 * await addClient();
 * ```
 */
export const addClient = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "ID of the client: ",
    },
    {
      type: "input",
      name: "name",
      message: "Name of the client: ",
    },
    {
      type: "list",
      name: "race",
      message: "Select the race of the client: ",
      choices: [
        { name: "🧑 Human", value: Races.HUMAN },
        { name: "🧝 Elf", value: Races.ELF },
        { name: "🪓 Dwarf", value: Races.DWARF },
        { name: "⚔️ Witcher", value: Races.WITCHER },
        { name: "🍞 Halveling", value: Races.HALVELING },
        { name: "🧝‍♂️ Halveelf", value: Races.HALVEELF },
      ],
    },
    {
      type: "list",
      name: "location",
      message: "Place of birth of the client: ",
      choices: [
        { name: "🏰 Novigrad", value: Locations.NOVIGRAD },
        { name: "🏞️ Velen", value: Locations.VELEN },
        { name: "🏞️ Skellige", value: Locations.SKELLIGE },
        { name: "🏕️ Kaer Morhen", value: Locations.KAER_MORHEN },
        { name: "🏔️ Toussant", value: Locations.TOUSSANT },
        { name: "🏰 Nilfgaard", value: Locations.NILFGAARD },
        { name: "🏰 Redania", value: Locations.REDANIA }
      ],
    },
  ]);

  // TODO ADD CLIENT TO DB
};

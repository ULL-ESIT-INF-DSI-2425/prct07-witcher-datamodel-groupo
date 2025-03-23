import inquirer from "inquirer";
import { Races } from "../../enums/races.js";
import { Locations } from "../../enums/locations.js";
import { Client } from "../../models/client.js";
import { DB_Client } from "../../db/db_clients.js";

/**
 * Function to add a client
 *
 * addClient
 * @example
 * ```typescript
 * await addClient();
 * ```
 */
export const addClient = async (dbClient: DB_Client) => {
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

  const newClient = new Client(
    parseInt(answers.id),
    answers.name,
    answers.race,
    answers.location
  );

  try {
    dbClient.addClient(newClient);
    console.log(`Client "${newClient.name}" added successfully to the database`);
  } catch (error){
    console.log(`Failed to add the client`, error);
  }
};

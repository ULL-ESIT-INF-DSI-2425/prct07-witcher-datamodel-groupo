import inquirer from "inquirer";
import { Races } from "../../enums/races.js";
import { Locations } from "../../enums/locations.js";
import { DB_Client } from "../../db/db_clients.js";
import { Client } from "../../models/client.js";

export const removeClient = async (dbClient: DB_Client) => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "Enter the ID of the client you want to remove",
    },
    {
      type: "input",
      name: "name",
      message: "Enter the name of the client you want to remove",
    },
    {
      type: "list",
      name: "race",
      message: "Select the race of the client you want to remove:",
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
      message: "Enter the new location for the client:",
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

  const removeClient = new Client(
    parseInt(answers.id),
    answers.name,
    answers.race,
    answers.location,
  );

  try {
    dbClient.removeClient(removeClient);
    console.log(`Client "${removeClient.name}" removed successfully from the database`);
  } catch (error) {
    console.error(`Error removing client`, error);
  }
};
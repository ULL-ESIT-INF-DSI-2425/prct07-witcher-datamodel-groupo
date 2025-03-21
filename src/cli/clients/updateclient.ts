import inquirer from "inquirer";
import { DB_Client } from "../../db/db_clients.js";
import { Locations } from "../../enums/locations.js";
import { Races } from "../../enums/races.js";

/**
 * Function to update a client
 * 
 * updateClient
 * @example
 * ```typescript
 * await updateClient();
 * ```
 */
export const updateClient = async (dbClient: DB_Client) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "ID of the client you want to update:",
      validate: (input: string) => !isNaN(parseInt(input)) ? true : "Please enter a valid number",
    },
    {
      type: "input",
      name: "attribute",
      message: "Update the name of the client:",
      validate: (input) => ['name', 'race', 'location'].includes(input) 
      ? true 
      : "Please enter a valid attribute name",
    },
  ]);

  // TODO UPDATE CLIENT IN DB
  let newValue: string | number | Races | Location;

  if(answers.attribute === 'race') {
    const raceAnswer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: "Enter the new race for the client:",
      choices: [
        { name: "🧑 Human", value: Races.HUMAN },
        { name: "🧝 Elf", value: Races.ELF },
        { name: "🪓 Dwarf", value: Races.DWARF },
        { name: "⚔️ Witcher", value: Races.WITCHER },
        { name: "🍞 Halveling", value: Races.HALVELING },
        { name: "🧝‍♂️ Halveelf", value: Races.HALVEELF },
      ],
      },
    ]);
    newValue = raceAnswer.value;
  } else {
    const raceAnswer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
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
    newValue = raceAnswer.value;
  }

  try{
    dbClient.modifyClient(parseInt(answers.id), answers.attribute, newValue);
    console.log(`Client updated ${answers.id} successfully!`);
  } catch (error) {
    console.error(`Failed to update the client: `, error);
  }
}
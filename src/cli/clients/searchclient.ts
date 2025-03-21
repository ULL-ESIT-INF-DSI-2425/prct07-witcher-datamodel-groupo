import inquirer from "inquirer";
import { DB_Client } from "../../db/db_clients.js";
import { Client } from "../../models/client.js";

export const searchClient = async (dbClient: DB_Client) => {
  const search = await inquirer.prompt([
    {
      type: "list",
      name: "searchby",
      message: "Search by: ",
      choices: [
        { name: "ID", value: "id" },
        { name: "Name", value: "name" },
        { name: "Race", value: "race" },
        { name: "Location", value: "location" },
      ],
    },
    {
      type: "input",
      name: "query",
      message: (search) => `Enter the ${search.searchby} to search for: `,
      validate: (input) => input.trim().length > 0 ? true : "Please enter a valid input",
    },
  ]);

  let results: Client[] = dbClient.searchClient(search.searchby, search.query);

  if (results.length > 0) {
    console.log('Search results:');
    console.table(results.map((client) => ({
      ID: client.id,
      Name: client.name,
      Races: client.race,
      Location: client.location,
    })));
  } else {
    console.log("No clients found matching your search criteria.");
  }
};
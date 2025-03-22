import inquirer from "inquirer";
import { DB_Merchant } from "../../db/db_merchants.js";
import { Merchant } from "../../models/merchant.js";


/**
 * Function to search a merchant
 * 
 * searchMerchant
 * @example
 * ```typescript
 * await searchMerchant();
 * ```
 */
export const searchMerchant = async (dbMerchant: DB_Merchant) => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "searchby",
      message: "Search by: ",
      choices: [
        { name: "ID", value: "id" },
        { name: "Name", value: "name" },
        { name: "Type", value: "type" },
        { name: "Location", value: "location" },
      ],
    },
  ]);

  let results: Merchant[] = [];
  if (answers.searchby === "id") {
    // los argumentos de la funcion searchMerchant es el el atributo que se va a buscar y el valor que se va a buscar
    const query = await inquirer.prompt([
      {
        type: "input",
        name: "query",
        message: "Enter the ID to search for:",
        validate: (input) => !isNaN(parseInt(input)) ? true : "Please enter a valid numeric ID.",
      },
    ]);
    results = dbMerchant.searchMerchant("id", parseInt(query.query));
  } else if (answers.searchby === "name") {
    const query = await inquirer.prompt([
      {
        type: "input",
        name: "query",
        message: "Enter the name to search for:",
        validate: (input) => input.trim().length > 0 ? true : "Please enter a valid search query.",
      },
    ]);
    results = dbMerchant.searchMerchant("name", query.query);
  } else if (answers.searchby === "type") {
    // mostrar los tipos de merchant
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Select the type of the merchant:",
        choices: [
          { name: '🛡️ Blacksmith', value: "Blacksmith" },
          { name: '🧑‍🔬 Alchemist', value: "Alchemist" },
          { name: '🧙‍♂️ Enchanter', value: "Enchanter" },
          { name: '🤑 General Merchant', value: "General Merchant"},
          { name: '👑 Gobernor', value: "Gobernor"},
        ],
      },
    ]);
    results = dbMerchant.searchMerchant("type", answer.type);
  } else if (answers.searchby === "location") {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "location",
        message: "Select the location of the merchant:",
        choices: [
          { name: '🏰 Novigrad', value: "Novigrad" },
          { name: '🏞️ Velen', value: "Velen" },
          { name: '🏔️ Skellige', value: "Skellige" },
          { name: '🏜️ Toussaint', value: "Toussaint" },
          { name: '🏴‍☠️ Kaer Morhen', value: "Kaer Morhen" },
          { name: '🏴‍☠️ Nilfgaard', value: "Nilfgaard" },
          { name: '🏴‍☠️ Redania', value: "Redania" },
        ],
      },
    ]);
    results = dbMerchant.searchMerchant("location", answer.location);
  }
  if (results.length > 0) {
    console.log("Search results:");
    console.table(results.map((merchant) => ({
      ID: merchant.id,
      Name: merchant.name,
      Type: merchant.type,
      Location: merchant.location,
    })));
  } else {
    console.log("No merchants found matching your search criteria.");
  }
}
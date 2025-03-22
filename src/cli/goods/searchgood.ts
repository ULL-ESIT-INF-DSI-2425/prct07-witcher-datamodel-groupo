import inquirer from "inquirer";
import { DB_Good } from '../../db/db_good.js';
import { GoodStack } from '../../types/goodstack.js';

/**
 * Function to search a good
 * 
 * searchGood
 * @example
 * ```typescript
 * await searchGood();
 * ```
 */
export const searchGood = async (dbGood: DB_Good) => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "searchby",
      message: "Search by: ",
      choices: [
        { name: "Name", value: "name" },
        { name: "Description", value: "description" },
      ],
    },
    {
      type: "input",
      name: "query",
      message: (answers) => `Enter the ${answers.searchby} to search for:`,
      validate: (input) => input.trim().length > 0 ? true : "Please enter a valid search query.",
    },
  ]);

  let results: GoodStack[] = [];

  if (answers.searchby === "name") {
    results = dbGood.searchGoodsByName(answers.query);
  } else if (answers.searchby === "description") {
    results = dbGood.searchGoodsByDescription(answers.query);
  }

  if (results.length > 0) {
    console.log("Search results:");
    console.table(results.map((goodstack) => ({
      ID: goodstack[0].id,
      Name: goodstack[0].name,
      Description: goodstack[0].description,
      Material: goodstack[0].material,
      Weight: goodstack[0].weight,
      Value: goodstack[0].value,
      Quantity: goodstack[1],
    })));
  } else {
    console.log("No goods found matching your search criteria.");
  }
};
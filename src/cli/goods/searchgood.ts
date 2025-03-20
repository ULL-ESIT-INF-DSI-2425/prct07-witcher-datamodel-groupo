import inquirer from "inquirer";
import { DB_Good } from '../../db/db_good.js';
import { Good } from '../../models/good.js';

/**
 * Function to remove a good
 * 
 * removeGood
 * @example
 * ```typescript
 * await removeGood();
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

  let results: Good[] = [];

  if (answers.searchby === "name") {
    results = dbGood.searchGoodsByName(answers.query);
  } else if (answers.searchby === "description") {
    results = dbGood.searchGoodsByDescription(answers.query);
  }

  if (results.length > 0) {
    console.log("Search results:");
    console.table(results.map((good) => ({
      ID: good.id,
      Name: good.name,
      Description: good.description,
      Material: good.material,
      Weight: good.weight,
      Value: good.value,
    })));
  } else {
    console.log("No goods found matching your search criteria.");
  }
};
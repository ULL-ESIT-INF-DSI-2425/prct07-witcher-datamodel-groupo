import inquirer from "inquirer";
import { DB_Good } from "../../db/db_good.js";
import { Good } from "../../models/good.js";

export const sortGood = async (dbGood: DB_Good) => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "sortby",
      message: "Sort by: ",
      choices: [
        { name: "Alphabetically by name", value: "name" },
        { name: "By value (crowns)", value: "value" },
      ],
    },
    {
      type: "list",
      name: "order",
      message: "Order: ",
      choices: [
        { name: "Ascending", value: "asc" },
        { name: "Descending", value: "desc" },
      ],
    },
  ]);

  let results: Good[] = [];

  if (answers.sortby === "name") {
    results = dbGood.sortGoodsAlphabetically(answers.order);
  } else if (answers.sortby === "value") {
    results = dbGood.sortGoodsByValue(answers.order);
  }

  if (results.length > 0) {
    console.log("Sorted goods:");
    console.table(results.map((good) => ({
      ID: good.id,
      Name: good.name,
      Description: good.description,
      Material: good.material,
      Weight: good.weight,
      Value: good.value,
    })));
  } else {
    console.log("No goods found to sort.");
  }
};
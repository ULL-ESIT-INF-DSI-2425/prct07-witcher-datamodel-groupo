import inquirer from "inquirer";
import { addMerchant } from "./addmerchant.js";
import { DB_Merchant } from "../../db/db_merchants.js";
import { removeMerchant } from "./removemerchant.js";
//import { updateMerchant } from "./update-merchant";
//import { removeMerchant } from "./remove-merchant";
//import { searchMerchant } from "./search-merchant";

/**
 * Function to manage the merchant menu
 * 
 * merchantMenu
 * @example
 * ```typescript
 * await merchantMenu();
 * ```
 */
export const merchantMenu = async (dbMerchant: DB_Merchant) => {
  let managing = true;

  while (managing) {
    const { accion } = await inquirer.prompt([
      {
        type: "list",
        name: "accion",
        message: "Merchant manager:",
        choices: [
          "➕\tAdd merchant",
          "📝\tUpdate merchant",
          "🗑️\tRemove merchant",
          "🔍\tSearch merchant",
          "⬅️\tBack",
        ]
      },
    ]);

    switch (accion) {
      case "➕\tAdd merchant":
        await addMerchant(dbMerchant);
        break;
      case "📝\tUpdate merchant":
        console.log("Updating merchant...");
        //await updateMerchant();
        break;
      case "🗑️\tRemove merchant":
        await removeMerchant(dbMerchant);
        break;
      case "🔍\tSearch merchant":
        console.log("Searching merchant...");
        // await searchMerchant();
        break;
      case "⬅️\tBack":
        managing = false;
        return;
    }
  }
};

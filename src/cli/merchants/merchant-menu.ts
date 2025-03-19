import inquirer from "inquirer";
//import { addMerchant } from "./add-merchant";
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
export const merchantMenu = async () => {
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
      case "➕\t Add merchant":
        console.log("Adding merchant...");
        // await addMerchant();;
        break;
      case "📝\tUpdate merchant":
        console.log("Updating merchant...");
        // await updateMerchant();
        break;
      case "🗑️\tRemove merchant":
        console.log("Removing merchant...");
        // await removeMerchant();
        break;
      case "🔍\tSearch merchant":
        console.log("Searching merchant...");
        // await searchMerchant();
        break;
      case "⬅️\tBack":
        return;
    }
  }
};

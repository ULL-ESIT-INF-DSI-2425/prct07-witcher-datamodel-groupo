import inquirer from "inquirer";
import { DB_Merchant } from "../../db/db_merchants.js";
import { Locations } from "../../enums/locations.js";
import { MerchantType } from "../../enums/merchantType.js";

/**
 * Function to update a merchant
 * 
 * updateMerchant
 * @example
 * ```typescript
 * await updateMerchant();
 * ```
 */
export const updateMerchant = async (dbMerchant: DB_Merchant) => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'ID of the merchant to update:',
      validate: (input) => !isNaN(parseInt(input)) ? true : 'Please enter a valid numeric ID.',
    },
    {
      type: 'input',
      name: 'attribute',
      message: 'Name of the attribute to update (e.g., name, type, location):',
      validate: (input) => ['name', 'type', 'location'].includes(input)
        ? true
        : 'Please enter a valid attribute name.',
    }
  ]);
  let newValue: string | MerchantType | Locations;
  if (answers.attribute === 'type') {
    const typeAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Select the new type of the merchant:",
        choices: [
          { name: '🛡️ Blacksmith', value: MerchantType.BLACKSMIT },
          { name: '🧑‍🔬 Alchemist', value: MerchantType.ALCHEMIST },
          { name: '🧙‍♂️ Enchanter', value: MerchantType.ENCHANTER },
          { name: '🤑 General Merchant', value: MerchantType.GENERAL_MERCHANT},
          { name: '👑 Gobernor', value: MerchantType.GOBERNOR},
        ],
      },
    ]);
    newValue = typeAnswer.type;
  } else if (answers.attribute === 'location') {
    const locationAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "location",
        message: "Select the new location of the merchant:",
        choices: [
          { name: '🏰 Novigrad', value: Locations.NOVIGRAD },
          { name: '🏞️ Velen', value: Locations.VELEN },
          { name: '🏔️ Skellige', value: Locations.SKELLIGE },
          { name: '🏜️ Toussaint', value: Locations.TOUSSANT },
          { name: '🏴‍☠️ Kaer Morhen', value: Locations.KAER_MORHEN },
          { name: '🏴‍☠️ Nilfgaard', value: Locations.NILFGAARD },
          { name: '🏴‍☠️ Redania', value: Locations.REDANIA },
        ],
      },
    ]);
    newValue = locationAnswer.location;
  } else {
    // en caso de que se quiera modificar el nombre
    const nameAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: `New name for the merchant:`,
        validate: (input) => input.trim() !== "" ? true : "Name cannot be empty.",
      }
    ]);
    newValue = nameAnswer.name;
  }
  try {
    // buscar el comerciante con el id dado
    dbMerchant.modifyMerchant(dbMerchant.searchMerchant('id', parseInt(answers.id))[0], answers.attribute, newValue);
  } catch (error) {
    console.error(`Failed to update the merchant`, error);
  }
}
import inquirer from 'inquirer';
import { DB_Merchant } from '../../db/db_merchants.js';
import { Merchant } from '../../models/merchant.js';
import { Locations } from '../../enums/locations.js';
import { MerchantType } from '../../enums/merchantType.js';


export const removeMerchant = async (dbMerchant: DB_Merchant) => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'ID of the merchant: ',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Name of the merchant: ',
    },
    {
      type: 'list',
      name: 'merchantType',
      message: 'Select the type of the merchant:',
      choices: [
        { name: '🛡️ Blacksmith', value: MerchantType.BLACKSMIT },
        { name: '🧑‍🔬 Alchemist', value: MerchantType.ALCHEMIST },
        { name: '🧙‍♂️ Enchanter', value: MerchantType.ENCHANTER },
        { name: '🤑 General Merchant', value: MerchantType.GENERAL_MERCHANT},
        { name: '👑 Gobernor', value: MerchantType.GOBERNOR},
      ],
    },
    { 
      type: 'list',
      name: 'location',
      message: 'Select the location of the merchant:',
      choices: [
        { name: '🏰 Novigrad', value: Locations.NOVIGRAD },
        { name: '🏞️ Velen', value: Locations.VELEN },
        { name: '🏔️ Skellige', value: Locations.SKELLIGE },
        { name: '🏜️ Toussaint', value: Locations.TOUSSANT },
        { name: '🏴‍☠️ Kaer Morhen', value: Locations.KAER_MORHEN },
        { name: '🏴‍☠️ Nilfgaard', value: Locations.NILFGAARD },
        { name: '🏴‍☠️ Redania', value: Locations.REDANIA },
      ],
    }
  ]);
  const removeMerchant = new Merchant(
    parseInt(answer.id),
    answer.name,
    answer.merchantType,
    answer.location
  );
  try {
    dbMerchant.removeMerchant(removeMerchant);
    console.log(`Merchant ${removeMerchant.name} removed successfully`);
  } catch (error) {
    console.error(`Failed to remove the merchant`, error);
  }
};
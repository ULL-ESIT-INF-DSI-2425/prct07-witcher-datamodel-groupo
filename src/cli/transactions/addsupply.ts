import inquirer from 'inquirer';
import { DB_Transactions } from '../../db/db_transaction.js';
import { Good } from '../../models/good.js';
import { Merchant } from '../../models/merchant.js';
import { Shop } from '../../models/shop.js';
import { Materials } from '../../enums/materials.js';

/**
 * Function to add a supplier
 * 
 * addSupply
 * @example
 * ```typescript
 * await addSupply(transactions);
 * ```
 */
export const addSupply = async (transactions: DB_Transactions) => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'shopid',
      message: 'ID of the shop:',
    },
    {
      type: 'input',
      name: 'merchantid',
      message: 'ID of the merchant:',
    },
    {
      type: 'input',
      name: 'id',
      message: 'ID of the GOOD to supply:',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Name of the GOOD to supply:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description of the GOOD to supply:',
    },
    {
      type: "list",
      name: "material",
      message: "Select the material of the GOOD to supply: ",
      choices: [
        { name: "🔩 Makaham Steel", value: Materials.MAKAHAM_STEEL },
        { name: "🛡️ Hardened Leather", value: Materials.HARDENED_LEATHER },
        { name: "✨ Magic Essence", value: Materials.MAGIC_ESSENCE },
        { name: "👹 Monster Essence", value: Materials.MONSTER_ESSENCE },
        { name: "☄️ Meteorite Lingot", value: Materials.METEORITE_LINGOT },
        { name: "🌲 Resin", value: Materials.RESIN },
        { name: "💎 Ruby Dust", value: Materials.RUBY_DUST },
        { name: "🧵 Steel Line", value: Materials.STEEL_LINE },
        { name: "🎤 Siren Vocal Chords", value: Materials.SIREN_VOCAL_CHORDS },
        { name: "⚗️ Zerrikanian Powder", value: Materials.ZERRIKANIAN_POWDER },
      ],
    },
    {
      type: 'input',
      name: 'weight',
      message: 'Weight of the GOOD to supply:',
    },
    {
      type: 'input',
      name: 'value',
      message: 'Value (crowns) of each GOOD to supply:',
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'Quantity to buy:',
    },
    {
      type: 'input',
      name: 'totalprice',
      message: 'Total crows of the transaction:',
    },
  ]);
  
  const buyGood = new Good(
    parseInt(answers.id), 
    answers.name,
    answers.description,
    answers.material,
    parseFloat(answers.weight),
    parseFloat(answers.value)
  );
  
  const seller: Merchant = transactions._dbmerchant.searchMerchant("id" ,parseInt(answers.merchantid))[0];

  const newShop: Shop = new Shop(parseInt(answers.shopid), seller, buyGood, parseInt(answers.quantity), parseInt(answers.totalprice), new Date());

  try {
    transactions.addShop(newShop);
    console.log(`Supply order "${newShop.id}" performmed successfully.`);
  } catch (error) {
    console.error(`Failed to perform to place order`, error);
  }
}


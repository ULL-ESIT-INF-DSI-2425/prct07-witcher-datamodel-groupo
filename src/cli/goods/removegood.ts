import inquirer from "inquirer";
import { DB_Good } from '../../db/db_good.js';
import { Good } from '../../models/good.js';
import { Materials } from '../../enums/materials.js';

/**
 * Function to remove a good
 * 
 * removeGood
 * @example
 * ```typescript
 * await removeGood();
 * ```
 */
export const removeGood = async (dbGood: DB_Good) => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'ID of the good:',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Name of the good:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description of the good:',
    },
    {
      type: "list",
      name: "material",
      message: "Select the material of the good: ",
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
      message: 'Weight of the good:',
    },
    {
      type: 'input',
      name: 'value',
      message: 'Value (crowns):',
    },
  ]);
  
  const removeGood = new Good(
    parseInt(answers.id), 
    answers.name,
    answers.description,
    answers.material,
    parseFloat(answers.weight),
    parseFloat(answers.value)
  );

  try {
    dbGood.removeGood(removeGood);
    console.log(`Good "${removeGood.name}" removed successfully from the database.`);
  } catch (error) {
    console.error(`Failed to remove the good`, error);
  }
};
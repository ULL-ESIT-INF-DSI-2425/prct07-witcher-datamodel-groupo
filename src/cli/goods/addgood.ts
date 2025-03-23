import inquirer from 'inquirer';
import { DB_Good } from '../../db/db_good.js';
import { Good } from '../../models/good.js';
import { Materials } from '../../enums/materials.js';

/**
 * Function to add a good
 * 
 * addGood
 * @example
 * ```typescript
 * await addGood();
 * ```
 */
export const addGood = async (dbGood: DB_Good) => {
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
  
  const newGood = new Good(
    parseInt(answers.id), 
    answers.name,
    answers.description,
    answers.material,
    parseFloat(answers.weight),
    parseFloat(answers.value)
  );

  try {
    dbGood.addGood(newGood);
    console.log(`Good "${newGood.name}" added successfully to the database.`);
  } catch (error) {
    console.error(`Failed to add the good`, error);
  }
}


import inquirer from "inquirer";
import { DB_Good } from "../../db/db_good.js";
import { Materials } from "../../enums/materials.js";

/**
 * Function to update a good
 * 
 * updateGood
 * @example
 * ```typescript
 * await updateGood();
 * ```
 */
export const updateGood = async (dbGood: DB_Good) => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'ID of the good to update:',
      validate: (input) => !isNaN(parseInt(input)) ? true : 'Please enter a valid numeric ID.',
    },
    {
      type: 'input',
      name: 'attribute',
      message: 'Name of the attribute to update (e.g., name, description, material, weight, value):',
      validate: (input) => ['name', 'description', 'material', 'weight', 'value'].includes(input)
        ? true
        : 'Please enter a valid attribute name.',
    },
  ]);

  let newValue: string | number | Materials;

  if (answers.attribute === 'material') {
    const materialAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "material",
        message: "Select the new material of the good:",
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
    ]);
    newValue = materialAnswer.material;
  } else {
    const modificationAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'modification',
        message: `New value for the attribute "${answers.attribute}":`,
        validate: (input) => {
          if (answers.attribute === 'weight' || answers.attribute === 'value') {
            return !isNaN(parseFloat(input)) && parseFloat(input) > 0
              ? true
              : 'Please enter a valid positive number.';
          }
          return input.trim().length > 0 ? true : 'Please enter a valid value.';
        },
      },
    ]);
    newValue = answers.attribute === 'weight' || answers.attribute === 'value'
      ? parseFloat(modificationAnswer.modification)
      : modificationAnswer.modification;
  }

  // Update the good in the database
  try {
    dbGood.modifyGoodAttribute(parseInt(answers.id), answers.attribute, newValue);
    console.log(`Good with ID ${answers.id} updated successfully.`);
  } catch (error) {
    console.error(`Failed to update the good:`, error);
  }
};
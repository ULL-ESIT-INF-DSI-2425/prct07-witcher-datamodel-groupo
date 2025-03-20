import inquirer from 'inquirer';
import { addGood } from './addgood.js';
import { removeGood } from './removegood.js';
import { updateGood } from './updategood.js';
import { searchGood } from './searchgood.js';
import { DB_Good } from '../../db/db_good.js';
import { sortGood } from './sortgood.js';

/**
 * Function to manage goods
 * 
 * goodMenu
 * @example
 * ```typescript
 * await goodMenu();
 * ```
 */
export const goodMenu = async (dbGood: DB_Good) => {
  let managing = true;

  while (managing) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Goods management:',
        choices: [
          '📦\tAdd good',
          '🛑\tRemove good',
          '🔍\tSearch good',
          '📶\tSort good',
          '🔄\tUpdate good',
          '⬅️\tBack',
        ],
      },
    ]);

    switch (action) {
      case '📦\tAdd good':
        await addGood(dbGood);
        break;
      case '🛑\tRemove good':
        await removeGood(dbGood);
        break;
      case '🔍\tSearch good':
        await searchGood(dbGood);
        break;
      case '📶\tSort good':
        await sortGood(dbGood);
        break;
      case '🔄\tUpdate good':
        await updateGood(dbGood);
        break;
      case '⬅️\tBack':
        managing = false;
        break;
    }
  }
};

// ejecutar la función
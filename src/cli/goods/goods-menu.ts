import inquirer from 'inquirer';
import { addGood } from './addgood.js';
import { removeGood } from './removegood.js';
import { updateGood } from './updategood.js';

export const goodMenu = async () => {
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
          '🔄\tUpdate good',
          '⬅️\tBack',
        ],
      },
    ]);

    switch (action) {
      case '📦\tAdd good':
        await addGood();
        break;
      case '🛑\tRemove good':
        await removeGood();
        break;
      case '🔍\tSearch good':
        //await searchGoods();
        break;
      case '🔄\tUpdate good':
        await updateGood();
        break;
      case '⬅️\tBack':
        managing = false;
        break;
    }
  }
};

// ejecutar la función
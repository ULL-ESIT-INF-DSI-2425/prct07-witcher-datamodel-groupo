import inquirer from 'inquirer';
import { goodMenu } from './goods/goods-menu.js';
import { clientMenu } from './clients/client-menu.js';
import { merchantMenu } from './merchants/merchant-menu.js';
import { DBManager } from '../services/dbmanager.js';

/**
 * Function to manage the main menu
 * 
 * mainMenu
 */
export const mainMenu = async () => {
  let running = true;

  const db = new DBManager();

  while (running) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What is thy bussiness here?',
        choices: [
          '🏹\tManage goods',
          '🛡️\tManage clients',
          '🔥\tManage merchants',
          '💰\tRegister a transaction',
          '📊\tReports management',
          '❌\tExit',
        ],
      },
    ]);

    switch (action) {
      case '🏹\tManage goods':
        await goodMenu(db.getDBGood());
        break;
      case '🛡️\tManage clients':
        await clientMenu();
        break;
      case '🔥\tManage merchants':
        await merchantMenu();
        break;
      case '💰\tRegister a transaction':
        //await registerTransaction();
        break;
      case '📊\tReports management':
        //await manageReports();
        break;
      case '❌\tExit':
        running = false;
        console.log('👋\tMay your sword be sharp traveller. Farewell!');
        db.saveAll();
        break;
    }
  }

};

// Start the main menu
mainMenu()
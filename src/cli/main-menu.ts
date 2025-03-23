import inquirer from 'inquirer';
import { goodMenu } from './goods/goods-menu.js';
import { clientMenu } from './clients/client-menu.js';
import { merchantMenu } from './merchants/merchant-menu.js';
import { DBManager } from '../services/dbmanager.js';
import { reportsMenu } from './reports/reports-menu.js';
import { DB_Transactions } from '../db/db_transaction.js'
import { transactionMenu } from "./transactions/transactions-menu.js"
/**
 * Function to manage the main menu
 * 
 * mainMenu
 */
export const mainMenu = async () => {
  let running = true;

  const db = new DBManager();

  const filePath = './src/db/db_transactions.json'
  let transactions = new DB_Transactions(filePath, db.getDBGood(), db.getDBMerchant(), db.getDBClient());

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
        await clientMenu(db.getDBClient());
        break;
      case '🔥\tManage merchants':
        await merchantMenu(db.getDBMerchant());
        break;
      case '💰\tRegister a transaction':
        await transactionMenu(transactions);
        break;
      case '📊\tReports management':
        await reportsMenu(db, transactions);
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
console.clear();
mainMenu()
import inquirer from 'inquirer';
import { DB_Transactions } from '../../db/db_transaction.js';
import { DBManager } from '../../services/dbmanager.js';
import { searchGood } from '../goods/searchgood.js';
import { bestSellingGoods, totalIncomeAndExpenses, historyTransactions } from '../../services/reportsmanager.js';

export const reportsMenu = async (dbManager: DBManager, dbTransactions: DB_Transactions) => {
  
  let managing = true;

  while (managing) {
    
    const { reportType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'reportType',
        message: '📊 Which report shall you seek?',
        choices: [
          '📦 Stock of a good',
          '🔥 Bestselling goods',
          '💰 Profit & Spenses summary',
          '📜 Transactions history',
          '⬅️ Back'
        ],
      },
    ]);
    
    switch (reportType) {
      case '📦 Stock of a good':
        await searchGood(dbManager.getDBGood());
        break;
      case '🔥 Bestselling goods':
        await bestSellingGoods(dbTransactions);
        break;
      case '💰 Profit & Spenses summary':
        await totalIncomeAndExpenses(dbTransactions);
        break;
      case '📜 Transactions history':
        const id = await inquirer.prompt([
          {
            type: 'input',
            name: 'clientid',
            message: 'What the ID of the client to check history?:',
          }
        ]);
        await historyTransactions(dbTransactions, parseInt(id.clientid));
        break;
      case '⬅️ Back':
        managing = false;
        return;
    }
  }
};

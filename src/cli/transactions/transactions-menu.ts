import inquirer from 'inquirer';
import { DB_Transactions } from "../../db/db_transaction.js"

export const transactionMenu = async (transaction: DB_Transactions) => {
  
  let managing = true;

  while (managing) {
    
    const { transactionType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'transactiontype',
        message: '💰 What may I help you with?',
        choices: [
          '📦 Make a transaction',
          '📜 Add a supply',
          '💰 Refund a sale',
          '⬅️ Back'
        ],
      },
    ]);
    
    switch (transactionType) {
      case '📦 Make a transaction':
        //await searchGood(dbManager.getDBGood());
        break;
      case '📜 Add a supply':
        //console.table(inventarioService.verBienesMasVendidos());
        break;
      case '💰 Refund a sale':
        //console.log(inventarioService.verResumenFinanciero());
        break;
      case '⬅️ Back':
        managing = false;
        return;
    }
  }
};

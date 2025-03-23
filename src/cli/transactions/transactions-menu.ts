import inquirer from 'inquirer';
import { DB_Transactions } from "../../db/db_transaction.js";
import { addTransaction } from './addtransaction.js';
import { returnTransaction } from './returntransaction.js';
import { addSupply } from './addsupply.js';


export const transactionMenu = async (transactions: DB_Transactions) => {
  
  let managing = true;

  while (managing) {
    
    const { transactiontype } = await inquirer.prompt([
      {
        type: 'list',
        name: 'transactiontype',
        message: '💰 What may I help you with?',
        choices: [
          '📦 Make a transaction',
          '📜 Add a supply',
          '🗳️ Manage refunds',
          '⬅️ Back'
        ],
      },
    ]);
    
    switch (transactiontype) {
      case '📦 Make a transaction':
        await addTransaction(transactions); // done, works
        break;
      case '📜 Add a supply':
        await addSupply(transactions); // done, works
        break;
      case '🗳️ Manage refunds':
        await returnTransaction(transactions); // check, not working
        break;
      case '⬅️ Back':
        managing = false;
        transactions.writeTransactions();
        return;
    }
  }
};

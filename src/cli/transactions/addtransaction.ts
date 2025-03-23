import inquirer from 'inquirer';
//import { DB_Good } from '../../db/db_good.js';
import { DB_Transactions } from '../../db/db_transaction.js';
import { Good } from '../../models/good.js';
//import { GoodStack } from "../../types/goodstack.js";
import { Client } from '../../models/client.js';
import { Sale } from '../../models/sale.js';

/**
 * Function to add a transaction
 * 
 * addTransaction
 * @example
 * ```typescript
 * await addGood();
 * ```
 */
export const addTransaction = async (transactions: DB_Transactions) => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'saleid',
      message: 'ID of the sale:',
    },
    {
      type: 'input',
      name: 'goodname',
      message: 'Name of the good:',
    },
    {
      type: 'input',
      name: 'clientid',
      message: 'ID of the client:',
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'Quantity to buy:',
    },
    {
      type: 'input',
      name: 'totalprice',
      message: 'Total crows of the transaction:',
    },
  ]);
  
  const buyGood: Good = transactions._dbsale.searchGoodsByName(answers.goodname)[0][0];
  const buyer: Client = transactions._dbclient.searchClient("id" ,parseInt(answers.clientid))[0];

  const newSale: Sale = new Sale(parseInt(answers.saleid), buyer, buyGood, parseInt(answers.quantity), parseInt(answers.totalprice), new Date());

  try {
    transactions.addSale(newSale);
    console.log(`Sale "${newSale.id}" performmed successfully.`);
  } catch (error) {
    console.error(`Failed to perform the sale`, error);
  }
}


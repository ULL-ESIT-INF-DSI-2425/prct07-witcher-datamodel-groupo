import inquirer from 'inquirer';
//import { DB_Good } from '../../db/db_good.js';
import { DB_Transactions } from '../../db/db_transaction.js';
import { Good } from '../../models/good.js';
import { Client } from '../../models/client.js';
import { Merchant } from '../../models/merchant.js';
//import { GoodStack } from "../../types/goodstack.js";
import { Return } from '../../models/return.js';
//import { Sale } from '../../models/sale.js';

/**
 * Function to add a transaction
 * 
 * addTransaction
 * @example
 * ```typescript
 * await addGood();
 * ```
 */
export const returnTransaction = async (transactions: DB_Transactions) => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'returntype',
      message: 'Who are you returning from?:',
      choices: [
        { name: '👤 Client', value: 'client'},
        { name: '🧌 Merchant', value: 'merchant'},
      ]
    },
    {
      type: 'input',
      name: 'saleid',
      message: 'Enter the ID of the sale to return:',
      validate: (input) => input.trim() !== '' || 'Return ID cannot be empty.',
    },
    {
      type: 'input',
      name: 'id_good',
      message: 'ID of the GOOD to return:',
    },
    {
      type: 'input',
      name: 'agentid',
      message: 'Enter the Agent ID:',
      validate: (input) => input.trim() !== '' || 'Agent ID cannot be empty.',
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'Enter the quantity to return:'
    }
  ]);

  let agent: Client | Merchant;

  if(answers.returntype === "client") {
    console.log("Client");
    agent = transactions._dbclient.searchClient("id", parseInt(answers.agentid))[0];
  } else {
    console.log("Merchant");
    agent = transactions._dbmerchant.searchMerchant("id", parseInt(answers.agentid))[0]
  }

  try {
    if (!agent) {
      console.error('Agent not found.');
      return;
    }
    if(answers.returntype == "client") {
      const agent_: Client = agent as Client;
      const goodToreturn = transactions._dbsale._inventory.find((good) => good[0].id === parseInt(answers.id_good))?.[0] as Good;
      const returnSale = new Return(parseInt(answers.saleid), agent_, goodToreturn, parseInt(answers.quantity), new Date());
      transactions.addReturnSale(returnSale);
      console.log(`Return for sale ID "${returnSale.id}" by client "${agent.id}" processed successfully.`);
    } else if(answers.returntype == "merchant") {
      const agent_: Merchant = agent as Merchant;
      const goodToreturn = transactions._dbsale._inventory.find((good) => good[0].id === parseInt(answers.id_good))?.[0] as Good;
      const returnShop = new Return(parseInt(answers.saleid), agent_, goodToreturn, parseInt(answers.quantity), new Date());
      transactions.addReturnShop(returnShop);
      console.log(`Return for sale ID "${returnShop.id}" by merchant "${agent.id}" processed successfully.`);
    }
  } catch (error) {
    console.error('Failed to process the return:', error);
  }
}




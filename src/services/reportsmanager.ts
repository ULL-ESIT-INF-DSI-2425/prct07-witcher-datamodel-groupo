import { DB_Transactions } from '../db/db_transaction.js';
import { Sale } from '../models/sale.js';
import { Good } from '../models/good.js';

/**
 * Method to get the best selling goods
 * @param dbTransaction - The database of transactions
 * @returns The best selling goods
 * @example
 * ```typescript
 * bestSellingGoods(dbTransaction);
 * ```
 */
export function bestSellingGoods(dbTransaction: DB_Transactions): Good[] {
  let sales = dbTransaction._sales;
  
  const result: Good[] = [];
  if(sales.length === 0) {
    throw new Error('No sales found');
  }

  let it: number = sales.length >= 3 ? 3 : sales.length;
  
  for(let i = 0; i < it; i++) {
    let bestSellingGoods = sales.reduce((max, sale) => {
      return sale.quantity > max.quantity ? sale : max;
    });
    //console.log(`Iteration ${i}: Best selling goods:`, bestSellingGoods);
    sales = sales.filter(sale => sale !== bestSellingGoods);
    result.push(bestSellingGoods.good);
  }

  console.table(result);
  return result;
}
/**
 * Method to get the total income and expenses
 * @param dbTransaction - The database of transactions
 * @returns The total income and expenses
 * @example
 * ```typescript
 * totalIncomeAndExpenses(dbTransaction);
 * ```
 */
export function totalIncomeAndExpenses(dbTransaction: DB_Transactions): { totalIncome: number, totalExpenses: number } {
  const sales = dbTransaction._sales;
  const shops = dbTransaction._shops;

  const totalIncome = sales.reduce((sum, sale) => sum + sale.total_price, 0);
  const totalExpenses = shops.reduce((sum, shop) => sum + shop.total_price, 0);

  console.log(`Total income: ${totalIncome} 🪙  |  Total expenses: ${totalExpenses} 🪙`);

  return { totalIncome, totalExpenses };
}
/**
 * Method to get the history of transactions
 * @param dbTransaction - The database of transactions
 * @param id - The id of the client
 * @returns The history of transactions
 * @example
 * ```typescript
 * historyTransactions(dbTransaction, 1);
 * ```
 */
export function historyTransactions(dbTransaction: DB_Transactions, id: number): Sale[] {
  const sales = dbTransaction._sales;
  let arrSales: Sale[] = [];

  sales.filter(sale => {
    if(sale.client.id === id) {
      arrSales.push(sale);
    }
  });

  console.table(arrSales);

  return arrSales;
}



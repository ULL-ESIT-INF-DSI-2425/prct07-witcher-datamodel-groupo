// import { db } from "../db/db.js";
// import { Transaction } from "../modules/transaction.js"; // Asegúrate de tener esta interfaz

// /**
//  * Add a transaction to the database
//  */
// export async function addTransaction(transaction: Transaction) {
//   db.data?.transactions.push(transaction);
//   await db.write();
// }

// /**
//  * Get all transactions (you can modify to get by specific filters)
//  */
// export async function getTransactions() {
//   return db.data!.transactions;
// }

// /**
//  * Get transactions by client or merchant
//  */
// export async function getTransactionsByEntity(entityId: string) {
//   return db.data!.transactions.filter(
//     (transaction) => transaction.clientId === entityId || transaction.merchantId === entityId
//   );
// }

// /**
//  * Example function to handle purchases or sales (you can enhance based on business logic)
//  */
// export async function handlePurchaseSale(
//   goodId: string,
//   quantity: number,
//   clientId: string,
//   merchantId: string,
//   isPurchase: boolean
// ) {
//   // Logic to handle purchase or sale
//   const transaction: Transaction = {
//     id: generateTransactionId(),
//     goodId,
//     quantity,
//     clientId,
//     merchantId,
//     isPurchase,
//     date: new Date().toISOString(),
//   };

//   await addTransaction(transaction);
//   // Update the stock after purchase or sale
//   if (isPurchase) {
//     // Decrease stock for purchase
//   } else {
//     // Increase stock for sale
//   }
// }

// /**
//  * Generate unique transaction ID
//  */
// function generateTransactionId(): string {
//   return `TXN-${Math.floor(Math.random() * 1000000)}`;
// }

import { TransactionsInfo } from "../interfaces/transactionsinfo.js";
import { Good } from "../models/good.js";

/**
 * Represent a Transaction object with its properties
 * 
 * @param {Good} _good - The good of the transaction
 * @param {number} _quantity - The quantity of the good of the transaction
 * @param {number} _total_price - The total price of the transaction
 * @param {Date} _date - The date of the transaction
 */
export abstract class Transaction implements TransactionsInfo {
  accessor _good: Good;
  accessor _quantity: number;
  accessor _total_price: number;
  accessor _date: Date;

  /**
   * The constructor of the class
   * @param good - The good of the transaction
   * @param quantity - The quantity of the good of the transaction
   * @param total_price - The total price of the transaction
   * @param date - The date of the transaction
   */
  constructor(
    public good: Good,
    public quantity: number,
    public total_price: number,
    public date: Date
  ) {
    this._good = good;
    this._quantity = quantity;
    this._total_price = total_price;
    this._date = date;
  }

  /**
   * A method to get the type of the transaction
   * @returns The type of the transaction
   */
  abstract getTransactionType(): string;
}
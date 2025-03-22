import { Transaction } from "./transaction.js";
import { Merchant } from "./merchant.js";
import { Good } from "./good.js";

/**
 * Represent a Shop object with its properties
 * 
 * @param {Merchant} _merchant - The merchant who made the shop
 */
export class Shop extends Transaction {
  accessor _merchant: Merchant;
  
  /**
   * The constructor of the class
   * @param id - The id of the shop
   * @param merchant - The merchant who made the shop
   * @param good - The good that was bought
   * @param quantity - The quantity of the good that was bought
   * @param total_price - The total price of the shop
   * @param date - The date of the shop
   */
  constructor(
    public id: number,
    public merchant: Merchant,
    public good: Good,
    public quantity: number,
    public total_price: number,
    public date: Date
  ) {
    super(id, good, quantity, total_price, date);
    this._merchant = merchant;
  }

  /**
   * A method to get the merchant of the shop
   * @returns The merchant of the shop
   */
  getTransactionType(): string {
    return "Shop";
  }
}

import { Transaction } from "./transaction.js";
import { Client } from "./client.js";
import { Good } from "./good.js";

/**
 * Represent a Sale object with its properties
 * 
 * @param _client - The client who made the sale
 */
export class Sale extends Transaction {
  accessor _client: Client;
  /**
   * The constructor of the class
   * @param id - The id of the sale
   * @param client - The client who made the sale
   * @param good - The good that was sold
   * @param quantity - The quantity of the good that was sold
   * @param total_price - The total price of the sale
   * @param date - The date of the sale
   */
  constructor(
    public id: number,
    public client: Client,
    public good: Good,
    public quantity: number,
    public total_price: number,
    public date: Date
  ) {
    super(id, good, quantity, total_price, date);
    this._client = client;
  }
  
  /**
   * A method to get the client of the sale
   * @returns The client of the sale
   */
  getTransactionType(): string {
    return "Sale";
  }
}
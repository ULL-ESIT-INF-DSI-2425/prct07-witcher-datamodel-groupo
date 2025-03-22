import { Merchant } from "./merchant.js";
import { Good } from "./good.js";

/**
 * Represents a Return object with its properties
 * 
 * @param _agent - The agent who made the return
 * @param _good - The good that is returned
 * @param _quantity - The quantity of the good that is returned
 * @param _date - The date of the return
 */
export class Return<T> {
  accessor _id: number; 
  accessor _agent: T;
  accessor _good: Good; // el bien que se devuelve
  accessor _quantity: number;
  accessor _date: Date;
  constructor(
    public id: number,
    public agent: T,
    public good: Good,
    public quantity: number,
    public date: Date
  ) {
    this._id = id;
    this._agent = agent;
    this._good = good;
    this._quantity = quantity;
    this._date = date;
  }
  /**
   * Method to get the type of the transaction
   * @returns If the agent is a Merchant, it returns "Merchant", if it is a Client, it returns "Client"
   */
  getTransactionType(): string {
    return this._agent instanceof Merchant ? "Merchant" : "Client";
  }
}
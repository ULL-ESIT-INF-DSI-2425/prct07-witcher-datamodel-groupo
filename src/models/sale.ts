import { Transaction } from "./transaction.js";
import { Client } from "./client.js";
import { Good } from "./good.js";

/**
 * Represent a Sale object with its properties
 */

export class Sale extends Transaction {
  accessor _client: Client;
  constructor(
    public client: Client,
    public good: Good,
    public quantity: number,
    public total_price: number,
    public date: Date
  ) {
    super(good, quantity, total_price, date);
    this._client = client;
  }
  getTransactionType(): string {
    return "Sale";
  }
}
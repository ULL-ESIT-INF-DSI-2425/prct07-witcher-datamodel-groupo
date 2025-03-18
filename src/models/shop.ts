import { Transaction } from "./transaction.js";
import { Merchant } from "./merchant.js";
import { Good } from "./good.js";

export class Shop extends Transaction {
  accessor _merchant: Merchant;
  constructor(
    public merchant: Merchant,
    public good: Good,
    public quantity: number,
    public total_price: number,
    public date: Date
  ) {
    super(good, quantity, total_price, date);
    this._merchant = merchant;
  }
  getTransactionType(): string {
    return "Shop";
  }
}

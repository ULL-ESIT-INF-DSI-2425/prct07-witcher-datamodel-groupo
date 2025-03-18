import { TransactionsInfo } from "../interfaces/transactionsinfo.js";
import { Good } from "../models/good.js";

export abstract class Transaction implements TransactionsInfo {
  accessor _good: Good;
  accessor _quantity: number;
  accessor _total_price: number;
  accessor _date: Date;
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
  abstract getTransactionType(): string;
}
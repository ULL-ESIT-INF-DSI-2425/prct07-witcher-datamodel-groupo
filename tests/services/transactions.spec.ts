import { describe, it, expect } from 'vitest';
import { DB_Transactions } from '../../src/services/transactions';
import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import { TransactionsSchema } from '../../src/schemas/transactions';
import { Good } from '../../src/models/good';
import { Transaction } from '../../src/models/transaction';

describe('DB_Transactions', () => {
  const adapter = new JSONFile<TransactionsSchema>('./src/db/db_transactions.json');
  const db = new Low<TransactionsSchema>(adapter, { sale: [], shop: []});
  const dbTransactions = new DB_Transactions(adapter, db);

  it('Should be defined', () => {
    expect(dbTransactions).toBeDefined();
  });
  it ('Should have a property "adapter" that is an instance of JSONFile', () => {
    expect(dbTransactions.adapter).toBeInstanceOf(JSONFile);
  });
  it ('Should have a property "db" that is an instance of Low', () => {
    expect(dbTransactions.db).toBeInstanceOf(Low);
  });

});
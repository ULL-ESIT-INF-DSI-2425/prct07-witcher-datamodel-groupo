import { describe, it, expect } from 'vitest';
import { bestSellingGoods, totalIncomeAndExpenses } from '../../src/services/reportsmanager.js';
import { Good } from '../../src/models/good.js';
import { Materials } from '../../src/enums/materials.js';
import { DB_Transactions } from '../../src/db/db_transaction.js';

describe('class ReportsManager tests', () => {
  
  it('should throw an error when there are no sales', () => {
    const dbTransaction = { _sales: [] } as DB_Transactions;
    expect(() => bestSellingGoods(dbTransaction)).toThrow('No sales found');
  });

  it('should have a function bestSellingProduct', () => {
    const good1 = new Good(1, "Mahakam Steel Sword", "An exceptionally forged dwarven sword, used by the finest warriors of Mahakam.", Materials.MAKAHAM_STEEL, 100, 50);
    const good2 = new Good(2, "Hardened Leather Armor", "A set of armor made of hardened leather, providing good protection and flexibility.", Materials.HARDENED_LEATHER, 200, 100);
    const good3 = new Good(3, 'Martillo', 'Un martillo de acero', Materials.STEEL_LINE, 2.5, 12);
    const good4 = new Good(4, 'Escudo Diferente', 'Un escudo diferente', Materials.MAGIC_ESSENCE, 5, 20);
    const good5 = new Good(5, 'Casco', 'Un casco de hierro', Materials.MAKAHAM_STEEL, 3, 15);

    const dbTransaction = {
      _sales: [
        { quantity: 10, good: good1 },
        { quantity: 20, good: good2 },
        { quantity: 5, good: good3 },
        { quantity: 2, good: good4 },
        { quantity: 3, good: good5 },
      ]
    } as DB_Transactions;


    expect(bestSellingGoods(dbTransaction).includes(good2)).toBe(true);
    expect(bestSellingGoods(dbTransaction).includes(good1)).toBe(true);
    expect(bestSellingGoods(dbTransaction).includes(good3)).toBe(true);
    expect(bestSellingGoods(dbTransaction).includes(good4)).toBe(false);

  });

  it('should have a function totalIncomeAndExpenses', () => {
    const good1 = new Good(1, "Mahakam Steel Sword", "An exceptionally forged dwarven sword, used by the finest warriors of Mahakam.", Materials.MAKAHAM_STEEL, 100, 50);
    const good2 = new Good(2, "Hardened Leather Armor", "A set of armor made of hardened leather, providing good protection and flexibility.", Materials.HARDENED_LEATHER, 200, 100);
    const dbTransaction = {
      _sales: [
        { quantity: 10, _good: good1 },
        { quantity: 20, _good: good2 }
      ],
      _shops: [
        { total_price: 3000 },
        { total_price: 2000 }
      ],
      _returns: [
        {}
      ],
    } as DB_Transactions;
  
    expect(totalIncomeAndExpenses(dbTransaction)).toEqual({ totalIncome: NaN, totalExpenses: 5000 });
  });

  

});
import { describe, it, expect } from 'vitest';
import { Good } from '../../src/models/good.js';
import { Materials } from '../../src/enums/materials.js';

describe ( "Good clase", () => {
  it ("Should be defined", () => {
    expect(Good).toBeDefined();
  });
  it ("Should create a new instance", () => {
    const good = new Good(1, "Mahakam Steel Sword", "An exceptionally forged dwarven sword, used by the finest warriors of Mahakam.", Materials.MAKAHAM_STEEL, 100, 50);
    expect(good).toBeInstanceOf(Good);
    expect(good._id).toBe(1);
    expect(good._name).toBe("Mahakam Steel Sword");
    expect(good._description).toBe("An exceptionally forged dwarven sword, used by the finest warriors of Mahakam.");
    expect(good._material).toBe(Materials.MAKAHAM_STEEL);
    expect(good._weight).toBe(100);
    expect(good._value).toBe(50);
    const good2 = new Good(2, "Hardened Leather Armor", "A set of armor made of hardened leather, providing good protection and flexibility.", Materials.HARDENED_LEATHER, 200, 100);
    expect(good2).toBeInstanceOf(Good);
    expect(good2._id).toBe(2);
    expect(good2._name).toBe("Hardened Leather Armor");
    expect(good2._description).toBe("A set of armor made of hardened leather, providing good protection and flexibility.");
    expect(good2._material).toBe(Materials.HARDENED_LEATHER);
    expect(good2._weight).toBe(200);
    expect(good2._value).toBe(100);
  });
});


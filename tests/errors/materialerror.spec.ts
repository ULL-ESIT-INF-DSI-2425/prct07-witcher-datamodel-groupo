import { describe, it, expect } from 'vitest';
import { Good } from '../../src/models/good.js';
import { Materials } from '../../src/enums/materials.js';
import { AppError } from '../../src/errors/apperror.js';
import { MaterialError } from '../../src/errors/materialerror.js';


describe('GoodError', () => {
  it('should create a new MaterialError with a custom message', () => {
    const error = new MaterialError('Invalid Material provided');
    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe('Invalid Material provided');
  });

  it('should throw an AppError for invalid Material', () => {
    expect(() => new Good(1, "Mahakam Steel Sword", "An exceptionally forged dwarven sword, used by the finest warriors of Mahakam.", "Madera" as Materials, 100, 50))
    .toThrowError(AppError);
    expect(() =>new Good(2, "Hardened Leather Armor", "A set of armor made of hardened leather, providing good protection and flexibility.", "Blue stone" as Materials, 200, 100))
    .toThrowError('Unknown Material! Do not try to fool us bastard!');
    expect(() => new Good(3, "Mahakam Steel Sword", "An exceptionally forged dwarven sword, used by the finest warriors of Mahakam.", "Guayaba" as Materials, 100, 50))
    .toThrowError('Unknown Material! Do not try to fool us bastard!');
  });
});

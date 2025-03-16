import { describe, it, expect } from 'vitest';
import { AppError } from '../../src/errors/apperror.js';
import { Merchant } from '../../src/models/merchant.js';
import { MerchantType } from '../../src/enums/merchantType.js';
import { Locations } from '../../src/enums/locations.js';
import { Materials } from '../../src/enums/materials.js';
import { Races } from '../../src/enums/races.js';
import { Client } from '../../src/models/client.js';
import { Good } from '../../src/models/good.js';
import { IdError } from '../../src/errors/iderror.js';

describe('Id validation in models', () => {
  it('should create a new IdError with a custom message', () => {
    const error = new IdError('Invalid ID provided');
    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe('Invalid ID provided');
  });

  it('should throw an AppError for invalid Merchant id', () => {
    expect(() => new Merchant(-1, 'Test Merchant', MerchantType.BLACKSMIT, Locations.NOVIGRAD))
    .toThrow(AppError);
    expect(() => new Merchant(0, 'Test Merchant', MerchantType.BLACKSMIT, Locations.NOVIGRAD))
    .toThrow('As you know the id must be a positive integer. Do not waste my time!');
    expect(() => new Merchant(1.5, 'Test Merchant', MerchantType.BLACKSMIT, Locations.NOVIGRAD))
    .toThrow('As you know the id must be a positive integer. Do not waste my time!');
  });

  it('should throw an AppError for invalid Client id', () => {
    expect(() => new Client(-1, 'Test Client', Races.HUMAN, Locations.NILFGAARD))
    .toThrow(AppError);
    expect(() => new Client(0, 'Test Client', Races.HUMAN, Locations.NILFGAARD))
    .toThrow('As you know the id must be a positive integer. Do not waste my time!');
    expect(() => new Client(1.5, 'Test Client', Races.HUMAN, Locations.NILFGAARD))
    .toThrow('As you know the id must be a positive integer. Do not waste my time!');
  });

  it('should throw an AppError for invalid Good id', () => {
    expect(() => new Good(-1, 'Test Good', 'Description', Materials.HARDENED_LEATHER, 100, 10))
    .toThrow(AppError);
    expect(() => new Good(0, 'Test Good', 'Description', Materials.HARDENED_LEATHER, 100, 10))
    .toThrow('As you know the id must be a positive integer. Do not waste my time!');
    expect(() => new Good(1.5, 'Test Good', 'Description', Materials.HARDENED_LEATHER, 100, 10))
    .toThrow('As you know the id must be a positive integer. Do not waste my time!');
  });
});


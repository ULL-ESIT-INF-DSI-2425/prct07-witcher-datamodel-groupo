import { describe, it, expect } from 'vitest';
import { AppError } from '../../src/errors/apperror.js'; 
import { Locations } from '../../src/enums/locations.js';
import { MerchantType } from '../../src/enums/merchantType.js';
import { Merchant } from '../../src/models/merchant.js'; 
import { Races } from '../../src/enums/races.js';
import { Client } from '../../src/models/client.js';
import { LocationError } from '../../src/errors/locationerror.js';


describe('Models with location attribute', () => {
  it('should create a LocationError with a custom message', () => {
    const error = new LocationError("Invalid location provided");
    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe("Invalid location provided");
  });

  it('should throw an AppError for invalid Merchant location', () => {
    expect(() => new Merchant(1, 'Test Merchant', MerchantType.BLACKSMIT, "Palencia" as Locations))
    .toThrow(AppError);
    expect(() => new Merchant(2, 'Test Merchant', MerchantType.BLACKSMIT, "Huelva" as Locations))
    .toThrow("I have no idea where that is! You might as well be from the Moon!");
    expect(() => new Merchant(3, 'Test Merchant', MerchantType.BLACKSMIT, "Albacete" as Locations))
    .toThrow("I have no idea where that is! You might as well be from the Moon!");
  });

  it('should throw an AppError for invalid Client location', () => {
    expect(() => new Client(1, 'Test Client', Races.HUMAN, "Palencia" as Locations))
    .toThrow(AppError);
    expect(() => new Client(2, 'Test Client', Races.ELF, "Huelva" as Locations))
    .toThrow("I have no idea where that is! You might as well be from the Moon!");
    expect(() => new Client(3, 'Test Client', Races.DWARF, "Albacete" as Locations))
    .toThrow("I have no idea where that is! You might as well be from the Moon!");
  });

});
import { describe, it, expect } from 'vitest';
import { AppError } from '../../src/errors/apperror.js';
import { Locations } from '../../src/enums/locations.js';
import { Races } from '../../src/enums/races.js';
import { Client } from '../../src/models/client.js';
import { RaceError } from '../../src/errors/raceerror.js';

describe('RaceError', () => {
  it('should be an instance of AppError', () => {
    const error = new RaceError('Invalid race');
    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe('Invalid race');
  });

  it('should throw an AppError for invalid Client race', () => {
    expect(() => new Client(1, 'Test Client', "Elephant-man" as Races, Locations.NILFGAARD))
    .toThrow(AppError);
    expect(() => new Client(2, 'Test Client', "Hipogriph" as Races, Locations.NILFGAARD))
    .toThrow('We do not serve your kind here!');
    expect(() => new Client(3, 'Test Client', "Fairy" as Races, Locations.NILFGAARD))
    .toThrow('We do not serve your kind here!');
  });
});



import { describe, it, expect } from 'vitest';
import { TakenIdError } from '../../src/errors/takeniderror.js';

describe('TakenIdError', () => {
  it('should create an instance of TakenIdError with the correct name and message', () => {
    const errorMessage = 'This ID is already taken!';
    const error = new TakenIdError(errorMessage);

    expect(error).toBeInstanceOf(TakenIdError);
    expect(error.name).toBe('TakenIdError');
    expect(error.message).toBe(errorMessage);
  });

  it('should throw an AppError if the ID is already taken', () => {
    const takenIDs = [1, 2, 3];
    const idToCheck = 2;

    expect(() => TakenIdError.validate(idToCheck, takenIDs)).toThrowError('That ID is already taken!');
  });

  it('should not throw an error if the ID is not taken', () => {
    const takenIDs = [1, 2, 3];
    const idToCheck = 4;

    expect(() => TakenIdError.validate(idToCheck, takenIDs)).not.toThrow();
  });

  it('should handle an empty list of taken IDs without throwing an error', () => {
    const takenIDs: number[] = [];
    const idToCheck = 1;

    expect(() => TakenIdError.validate(idToCheck, takenIDs)).not.toThrow();
  });

  it('should throw an AppError with the correct message when ID is taken', () => {
    const takenIDs = [10, 20, 30];
    const idToCheck = 20;

    try {
      TakenIdError.validate(idToCheck, takenIDs);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('That ID is already taken!');
    }
  });
});
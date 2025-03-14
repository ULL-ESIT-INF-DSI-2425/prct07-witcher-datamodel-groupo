import { AppError } from '../errors/apperror.js';
import { Races } from '../enums/races.js';

/**
 * Represents an error specific to race-related operations.
 * 
 * Extends the `AppError` class to provide additional context for race errors.
 */
export class RaceError extends AppError {
  /**
   * Initializes a new instance of the `RaceError` class.
   * 
   * @param message - The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = 'RaceError';
  }
 
  /**
   * Validates if a race is valid
   * 
   * @param race - a Race to be validated
   */
  static validate(race: Races): void {
    if (!Object.values(Races).includes(race)) {
      throw new AppError('We do not serve your kind here!') 
    }
  }
}
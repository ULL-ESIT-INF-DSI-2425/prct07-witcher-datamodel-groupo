import { AppError } from '../errors/apperror';
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
   * @param message The error message.
   * @param statusCode The HTTP status code to return.
   */
  constructor(message: string) {
    super(message, statusCode);
    this.name = 'RaceError';
  }

  static validate(race: Races) {
    if (!Object.values(Races).includes(race)) {
      throw new AppError('Unknown Race! We do not serve your kind here')
    }
  }
}
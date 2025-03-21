import { AppError } from './apperror.js';

/**
 * IdError class
 * 
 * This class extends the AppError class and is used to handle errors related to the id
 */
export class IdError extends AppError {
  /**
   * Constructor
   * 
   * @param message - The message to display
   */
  constructor(message: string) {
    super(message);
    this.name = 'IdNonValid';
  }

  /**
   * Validate if the id is a positive integer
   * 
   * @param id - The id to validate
   */
  static validate(id: number): void {
    if(!Number.isInteger(id) || id <= 0) {
      throw new IdError('As you know the id must be a positive integer. Do not waste my time!');
    }
  }
}
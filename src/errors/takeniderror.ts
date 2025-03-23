import { AppError } from './apperror.js';

/**
 * TakenIdError class
 * 
 * This class should be used to handle errors that occur in the merchant service.
 */
export class TakenIdError extends AppError {
  /**
   * Constructor of the class TakenIdError
   * 
   * @param message - The error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'TakenIdError';
  }

  /**
   * Check if the ID is already taken
   * @param id - The ID to check (number)
   * @param takenIDs - The list of taken IDs (array of numbers)
   * @throws AppError - If the ID is already taken
   */
  static validate(id: number, takenIDs: number[]): void {
    if (takenIDs.includes(id)) {
      throw new AppError('That ID is already taken!');
    }
  }
}
import { AppError } from './apperror.js';

/**
 * NotInInventoyError class
 * 
 * This class is used to handle errors related to a good not having a specific atribute
 */
export class NoAtributeError extends AppError {
  /**
   * The constructor of the class NoAtributeError
   * @param message - The error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'NoAtributeError';
  }
}
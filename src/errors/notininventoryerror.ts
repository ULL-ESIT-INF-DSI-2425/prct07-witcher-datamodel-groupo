// Purpose: Implements the NotInInventoryError class.
// TODO: Implement the NotInInventoryError class.
import { AppError } from './apperror.js';
import { Good } from '../models/good.js';

/**
 * NotInInventoyError class
 * 
 * This class is used to handle errors related to a good not being in the inventory
 */
export class NotInInventoryError extends AppError {
  /**
   * Constructor
   * 
   * @param message - The error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'NotInIventoryError';
  }

  /**
   * validate if the good is not in the inventory
   * 
   * 
   */
  static validate(good: Good): void {
    
  }
}
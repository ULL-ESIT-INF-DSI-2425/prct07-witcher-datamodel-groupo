import { AppError } from './apperror';

/**
 * MerchantError
 * 
 * This class should be used to handle errors that occur in the merchant service.
 */
export class MerchantError extends AppError {
  /**
   * Constructor
   * 
   * @param {string} message - The error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'MerchantError';
  }
}
import { AppError } from './apperror.js';
import { MerchantType } from '../enums/merchantType.js';

/**
 * MerchantError class.
 * 
 * This class should be used to handle errors that occur in the merchant service.
 */
export class MerchantError extends AppError {
  /**
   * Constructor
   * 
   * @param message - The error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'MerchantError';
  }

  /**
   * Validate if the merchant type is valid
   * 
   * @param merchant - The merchant type to validate
   */
  static validate(merchant: MerchantType): void {
    if (!Object.values(MerchantType).includes(merchant)) {
      throw new AppError('That is not a job! Jokers are not allowed in this Inn!');
    }
  }
}
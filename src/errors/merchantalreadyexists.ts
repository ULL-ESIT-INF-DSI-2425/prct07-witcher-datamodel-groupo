import { AppError } from "./apperror.js";

/**
 * MerchantAlreadyExistsError class 
 * 
 * This class is used to handle the error when a merchant already exists in the database.
 */
export class MerchantAlreadyExistsError extends AppError {
  /**
   * The constructor of the class MerchantAlreadyExistsError.
   * 
   * @param message - The error message to be shown.
   */
  constructor(message: string) {
    super(message);
    this.name = 'Merchant Already Exists';
  }
}
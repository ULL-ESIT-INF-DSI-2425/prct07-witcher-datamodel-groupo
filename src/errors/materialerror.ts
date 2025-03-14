import { AppError } from "../errors/apperror";

/**
 * MaterialError
 * 
 * MaterialError is a class that extends AppError and is used to handle errors related to Material.
 */
export class MaterialError extends AppError {
  /**
   * Constructor
   * 
   * @param message - error message
   * @param status - error status
   */
  constructor(message: string) {
    super(message, status);
  }
}
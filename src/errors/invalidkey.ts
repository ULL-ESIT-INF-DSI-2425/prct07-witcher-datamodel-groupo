import { AppError } from "./apperror.js";

/**
 * InvalidKey class.
 * 
 * This class is used to handle the error when a key is invalid.
 */
export class InvalidKey extends AppError {

  /** 
   * Constructor for InvalidKey class.
   * 
   * @param message - The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = 'Invalid Key';
  }
}
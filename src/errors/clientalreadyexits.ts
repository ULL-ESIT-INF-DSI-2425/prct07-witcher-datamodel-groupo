import { AppError } from "./apperror.js";

/**
 * ClientAlreadyExistsError class.
 * 
 * This class is used to handle the error when a client already exists in the database.
 */
export class ClientAlreadyExistsError extends AppError {
  
  /**
   * The constructor of the class ClientAlreadyExistsError.
   * @param message - The error message to be shown.
   */
  constructor(message: string) {
    super(message);
    this.name = 'Client Already Exists';
  }
}
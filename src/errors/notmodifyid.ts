import { AppError } from './apperror.js';

/** 
 * NotModifyId class
 * 
 * This class is used to handle errors related to the modification of the id of an object.
 */
export class NotModifyId extends AppError {
  
  /** 
   * The constructor of the class NotModifyId
   * 
   * @param message - The message of the error
   */
  constructor(message: string) {
    super(message);
    this.name = 'Id cannot be modified';
  }
}
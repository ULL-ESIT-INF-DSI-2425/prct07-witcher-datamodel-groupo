import { AppError } from "../errors/apperror.js";
import { Materials } from "../enums/materials.js";

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
    super(message);
    this.name = 'MaterialError';
  }

  /**
   * Validates if the material is valid
   * 
   * @param material - material to be validated
   */
  static validate(material: Materials): void {
    if (!Object.values(Materials).includes(material)) {
      throw new AppError('Unknown Material! Do not try to fool us bastard!')
    }
  }
}
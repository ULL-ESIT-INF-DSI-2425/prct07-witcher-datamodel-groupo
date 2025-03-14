/** 
 * Custom application error class.
 *
 * Represents an error specific to the application context.
 */
export class AppError extends Error {
  /**
   * Creates an instance of AppError.
   *
   * @param message - The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "AppError";
  }

  static validate(type: T) {};
}

import { Locations } from '../enums/locations.js';
import { AppError } from './apperror.js';

/**
 * LocationError class
 * 
 * This class is used to handle errors related to location
 */
export class LocationError extends AppError {
  /**
   * Constructor
   * 
   * @param message - The error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'LocationError';
  }

  /**
   * validate if the location is valid
   * 
   * @param location - The location to validate
   */
  static validate(location: Locations): void {
    if (!Object.values(Locations).includes(location)) {
      throw new AppError('I have no idea where that is! You might as well be from the Moon!');
    }
  }
}
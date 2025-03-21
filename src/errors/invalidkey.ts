import { AppError } from "./apperror.js";

export class InvalidKey extends AppError {
  constructor(message: string) {
    super(message);
    this.name = 'Invalid Key';
  }
}
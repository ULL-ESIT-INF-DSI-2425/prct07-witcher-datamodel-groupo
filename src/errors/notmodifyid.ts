import { AppError } from './apperror.js';

export class NotModifyId extends AppError {
  constructor(message: string) {
    super(message);
    this.name = 'Id cannot be modified';
  }
}
import { BadRequestException } from '@nestjs/common';

export class BusinessException extends BadRequestException {
  constructor(objectOrError?: string | any, description?: string) {
    super(objectOrError, description);
  }
}

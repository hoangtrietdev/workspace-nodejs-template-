import { BadRequestException } from '@nestjs/common';
export declare class BusinessException extends BadRequestException {
    constructor(objectOrError?: string | any, description?: string);
}

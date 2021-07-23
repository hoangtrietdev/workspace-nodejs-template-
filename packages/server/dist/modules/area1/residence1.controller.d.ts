import { Type } from '@nestjs/common';
import { IBaseController } from 'src/core/factory.controller';
import { Residence1Service } from './residence1.service';
import { Resident1 } from 'src/models/resident1.entity';
export declare const imageFileFilter: (req: any, file: any, callback: any) => any;
export declare const editFileName: (req: any, file: any, callback: any) => void;
declare const BaseResidentController: Type<IBaseController<Resident1>>;
export declare class Residence1Controller extends BaseResidentController {
    protected readonly service: Residence1Service;
    constructor(service: Residence1Service);
    uploadedFile(image: any): Promise<{
        originalname: any;
        filename: any;
    }>;
}
export {};

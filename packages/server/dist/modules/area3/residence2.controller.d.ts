import { Type } from '@nestjs/common';
import { IBaseController } from 'src/core/factory.controller';
import { Residence2Service } from './residence2.service';
import { Resident2 } from 'src/models/resident2.entity';
export declare const imageFileFilter: (req: any, file: any, callback: any) => any;
export declare const editFileName: (req: any, file: any, callback: any) => void;
declare const BaseResidentController: Type<IBaseController<Resident2>>;
export declare class Residence2Controller extends BaseResidentController {
    protected readonly service: Residence2Service;
    constructor(service: Residence2Service);
    uploadedFile(image: any): Promise<{
        originalname: any;
        filename: any;
    }>;
}
export {};

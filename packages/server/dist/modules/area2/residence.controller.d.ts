import { Type } from '@nestjs/common';
import { IBaseController } from 'src/core/factory.controller';
import { Resident } from 'src/models/resident.entity';
import { ResidenceService } from './residence.service';
export declare const imageFileFilter: (req: any, file: any, callback: any) => any;
export declare const editFileName: (req: any, file: any, callback: any) => void;
declare const BaseResidentController: Type<IBaseController<Resident>>;
export declare class ResidenceController extends BaseResidentController {
    protected readonly service: ResidenceService;
    constructor(service: ResidenceService);
    uploadedFile(image: any): Promise<{
        originalname: any;
        filename: any;
    }>;
}
export {};

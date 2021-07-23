import { Injectable } from '@nestjs/common';
import { createBaseService } from 'src/core/factory.service';
import { Resident1 } from 'src/models/resident1.entity';

const BaseResidenceService = createBaseService(Resident1);

@Injectable()
export class Residence1Service extends BaseResidenceService {}

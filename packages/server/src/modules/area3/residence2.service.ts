import { Injectable } from '@nestjs/common';
import { createBaseService } from 'src/core/factory.service';
import { Resident2 } from 'src/models/resident2.entity';

const BaseResidenceService = createBaseService(Resident2);

@Injectable()
export class Residence2Service extends BaseResidenceService {}

import { Residence1Service } from './residence1.service';
import { Residence1Controller } from './residence1.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resident1 } from 'src/models/resident1.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resident1]),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [Residence1Controller],
  providers: [Residence1Service],
})
export class Residence1Module {}

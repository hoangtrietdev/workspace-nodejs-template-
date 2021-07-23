import { Residence2Service } from './residence2.service';
import { Residence2Controller } from './residence2.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resident2 } from 'src/models/resident2.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resident2]),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [Residence2Controller],
  providers: [Residence2Service],
})
export class Residence2Module {}

import { ResidenceModule } from './modules/area2/residence.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Residence1Module } from './modules/area1/residence1.module';
import { Residence2Module } from './modules/area3/residence2.module';

@Module({
  imports: [
    ResidenceModule,
    Residence1Module,
    Residence2Module,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

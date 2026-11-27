import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Festival } from '../festivales/entities/festival.entity';
import { Actuacion } from './entities/actuacion.entity';
import { ActuacionesService } from './actuaciones.service';
import { ActuacionesController } from './actuaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Festival, Actuacion])],
  providers: [ActuacionesService],
  controllers: [ActuacionesController]
})
export class ActuacionesModule {}

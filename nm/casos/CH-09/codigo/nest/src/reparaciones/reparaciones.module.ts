import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taller } from '../talleres/entities/taller.entity';
import { Reparacion } from './entities/reparacion.entity';
import { ReparacionesService } from './reparaciones.service';
import { ReparacionesController } from './reparaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Taller, Reparacion])],
  providers: [ReparacionesService],
  controllers: [ReparacionesController]
})
export class ReparacionesModule {}

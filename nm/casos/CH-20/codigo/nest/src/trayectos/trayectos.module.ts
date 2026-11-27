import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estacion } from '../estaciones/entities/estacion.entity';
import { Trayecto } from './entities/trayecto.entity';
import { TrayectosService } from './trayectos.service';
import { TrayectosController } from './trayectos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Estacion, Trayecto])],
  providers: [TrayectosService],
  controllers: [TrayectosController]
})
export class TrayectosModule {}

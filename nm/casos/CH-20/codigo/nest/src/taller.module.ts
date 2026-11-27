import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estacion } from './estaciones/entities/estacion.entity';
import { Trayecto } from './trayectos/entities/trayecto.entity';
import { TrayectosService } from './trayectos/trayectos.service';
import { TrayectosController } from './trayectos/trayectos.controller';
import { Conductor } from './conductores/entities/conductor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { ConductoresService } from './conductores/conductores.service';
import { ConductoresController } from './conductores/conductores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Estacion, Trayecto, Conductor, Asignacion])],
  controllers: [TrayectosController, ConductoresController, AsignacionesController],
  providers: [TrayectosService, ConductoresService, AsignacionesService]
})
export class TallerModule {}

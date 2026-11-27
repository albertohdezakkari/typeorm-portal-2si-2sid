import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './clubes/entities/club.entity';
import { Actividad } from './actividades/entities/actividad.entity';
import { ActividadesService } from './actividades/actividades.service';
import { ActividadesController } from './actividades/actividades.controller';
import { Monitor } from './monitores/entities/monitor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { MonitoresService } from './monitores/monitores.service';
import { MonitoresController } from './monitores/monitores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Club, Actividad, Monitor, Asignacion])],
  controllers: [ActividadesController, MonitoresController, AsignacionesController],
  providers: [ActividadesService, MonitoresService, AsignacionesService]
})
export class TallerModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taller } from './talleres/entities/taller.entity';
import { Reparacion } from './reparaciones/entities/reparacion.entity';
import { ReparacionesService } from './reparaciones/reparaciones.service';
import { ReparacionesController } from './reparaciones/reparaciones.controller';
import { Mecanico } from './mecanicos/entities/mecanico.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { MecanicosService } from './mecanicos/mecanicos.service';
import { MecanicosController } from './mecanicos/mecanicos.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Taller, Reparacion, Mecanico, Asignacion])],
  controllers: [ReparacionesController, MecanicosController, AsignacionesController],
  providers: [ReparacionesService, MecanicosService, AsignacionesService]
})
export class TallerModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './hospitales/entities/hospital.entity';
import { Habitacion } from './habitaciones/entities/habitacion.entity';
import { HabitacionesService } from './habitaciones/habitaciones.service';
import { HabitacionesController } from './habitaciones/habitaciones.controller';
import { Enfermero } from './enfermeros/entities/enfermero.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { EnfermerosService } from './enfermeros/enfermeros.service';
import { EnfermerosController } from './enfermeros/enfermeros.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital, Habitacion, Enfermero, Asignacion])],
  controllers: [HabitacionesController, EnfermerosController, AsignacionesController],
  providers: [HabitacionesService, EnfermerosService, AsignacionesService]
})
export class TallerModule {}

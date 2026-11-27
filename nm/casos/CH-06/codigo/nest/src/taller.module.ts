import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gimnasio } from './gimnasios/entities/gimnasio.entity';
import { Sesion } from './sesiones/entities/sesion.entity';
import { SesionesService } from './sesiones/sesiones.service';
import { SesionesController } from './sesiones/sesiones.controller';
import { Instructor } from './instructores/entities/instructor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { InstructoresService } from './instructores/instructores.service';
import { InstructoresController } from './instructores/instructores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Gimnasio, Sesion, Instructor, Asignacion])],
  controllers: [SesionesController, InstructoresController, AsignacionesController],
  providers: [SesionesService, InstructoresService, AsignacionesService]
})
export class TallerModule {}

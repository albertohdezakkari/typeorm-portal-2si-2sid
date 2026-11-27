import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudio } from './estudios/entities/estudio.entity';
import { Escena } from './escenas/entities/escena.entity';
import { EscenasService } from './escenas/escenas.service';
import { EscenasController } from './escenas/escenas.controller';
import { Actor } from './actores/entities/actor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { ActoresService } from './actores/actores.service';
import { ActoresController } from './actores/actores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Estudio, Escena, Actor, Asignacion])],
  controllers: [EscenasController, ActoresController, AsignacionesController],
  providers: [EscenasService, ActoresService, AsignacionesService]
})
export class TallerModule {}

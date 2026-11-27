import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complejo } from './complejos/entities/complejo.entity';
import { Pista } from './pistas/entities/pista.entity';
import { PistasService } from './pistas/pistas.service';
import { PistasController } from './pistas/pistas.controller';
import { Entrenador } from './entrenadores/entities/entrenador.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { EntrenadoresService } from './entrenadores/entrenadores.service';
import { EntrenadoresController } from './entrenadores/entrenadores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Complejo, Pista, Entrenador, Asignacion])],
  controllers: [PistasController, EntrenadoresController, AsignacionesController],
  providers: [PistasService, EntrenadoresService, AsignacionesService]
})
export class TallerModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from './escuelas/entities/escuela.entity';
import { Aula } from './aulas/entities/aula.entity';
import { AulasService } from './aulas/aulas.service';
import { AulasController } from './aulas/aulas.controller';
import { Docente } from './docentes/entities/docente.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { DocentesService } from './docentes/docentes.service';
import { DocentesController } from './docentes/docentes.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Escuela, Aula, Docente, Asignacion])],
  controllers: [AulasController, DocentesController, AsignacionesController],
  providers: [AulasService, DocentesService, AsignacionesService]
})
export class TallerModule {}

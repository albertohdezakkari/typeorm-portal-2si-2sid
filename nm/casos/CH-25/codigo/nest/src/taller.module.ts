import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emisora } from './emisoras/entities/emisora.entity';
import { Programa } from './programas/entities/programa.entity';
import { ProgramasService } from './programas/programas.service';
import { ProgramasController } from './programas/programas.controller';
import { Locutor } from './locutores/entities/locutor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { LocutoresService } from './locutores/locutores.service';
import { LocutoresController } from './locutores/locutores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Emisora, Programa, Locutor, Asignacion])],
  controllers: [ProgramasController, LocutoresController, AsignacionesController],
  providers: [ProgramasService, LocutoresService, AsignacionesService]
})
export class TallerModule {}

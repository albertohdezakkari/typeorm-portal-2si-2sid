import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cooperativa } from './cooperativas/entities/cooperativa.entity';
import { Lote } from './lotes/entities/lote.entity';
import { LotesService } from './lotes/lotes.service';
import { LotesController } from './lotes/lotes.controller';
import { Inspector } from './inspectores/entities/inspector.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { InspectoresService } from './inspectores/inspectores.service';
import { InspectoresController } from './inspectores/inspectores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cooperativa, Lote, Inspector, Asignacion])],
  controllers: [LotesController, InspectoresController, AsignacionesController],
  providers: [LotesService, InspectoresService, AsignacionesService]
})
export class TallerModule {}

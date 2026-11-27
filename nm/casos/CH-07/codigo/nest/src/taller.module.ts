import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agencia } from './agencias/entities/agencia.entity';
import { Excursion } from './excursiones/entities/excursion.entity';
import { ExcursionesService } from './excursiones/excursiones.service';
import { ExcursionesController } from './excursiones/excursiones.controller';
import { Guia } from './guias/entities/guia.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { GuiasService } from './guias/guias.service';
import { GuiasController } from './guias/guias.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Agencia, Excursion, Guia, Asignacion])],
  controllers: [ExcursionesController, GuiasController, AsignacionesController],
  providers: [ExcursionesService, GuiasService, AsignacionesService]
})
export class TallerModule {}

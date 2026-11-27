import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Museo } from './museos/entities/museo.entity';
import { Pieza } from './piezas/entities/pieza.entity';
import { PiezasService } from './piezas/piezas.service';
import { PiezasController } from './piezas/piezas.controller';
import { Restaurador } from './restauradores/entities/restaurador.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { RestauradoresService } from './restauradores/restauradores.service';
import { RestauradoresController } from './restauradores/restauradores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Museo, Pieza, Restaurador, Asignacion])],
  controllers: [PiezasController, RestauradoresController, AsignacionesController],
  providers: [PiezasService, RestauradoresService, AsignacionesService]
})
export class TallerModule {}

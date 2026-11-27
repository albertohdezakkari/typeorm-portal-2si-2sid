import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Huerto } from './huertos/entities/huerto.entity';
import { Parcela } from './parcelas/entities/parcela.entity';
import { ParcelasService } from './parcelas/parcelas.service';
import { ParcelasController } from './parcelas/parcelas.controller';
import { Cultivador } from './cultivadores/entities/cultivador.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { CultivadoresService } from './cultivadores/cultivadores.service';
import { CultivadoresController } from './cultivadores/cultivadores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Huerto, Parcela, Cultivador, Asignacion])],
  controllers: [ParcelasController, CultivadoresController, AsignacionesController],
  providers: [ParcelasService, CultivadoresService, AsignacionesService]
})
export class TallerModule {}

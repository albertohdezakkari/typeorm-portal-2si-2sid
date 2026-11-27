import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Puerto } from './puertos/entities/puerto.entity';
import { Embarcacion } from './embarcaciones/entities/embarcacion.entity';
import { EmbarcacionesService } from './embarcaciones/embarcaciones.service';
import { EmbarcacionesController } from './embarcaciones/embarcaciones.controller';
import { Tripulante } from './tripulantes/entities/tripulante.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { TripulantesService } from './tripulantes/tripulantes.service';
import { TripulantesController } from './tripulantes/tripulantes.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Puerto, Embarcacion, Tripulante, Asignacion])],
  controllers: [EmbarcacionesController, TripulantesController, AsignacionesController],
  providers: [EmbarcacionesService, TripulantesService, AsignacionesService]
})
export class TallerModule {}

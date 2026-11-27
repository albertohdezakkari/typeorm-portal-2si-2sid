import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratorio } from './laboratorios/entities/laboratorio.entity';
import { Muestra } from './muestras/entities/muestra.entity';
import { MuestrasService } from './muestras/muestras.service';
import { MuestrasController } from './muestras/muestras.controller';
import { Analista } from './analistas/entities/analista.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { AnalistasService } from './analistas/analistas.service';
import { AnalistasController } from './analistas/analistas.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Laboratorio, Muestra, Analista, Asignacion])],
  controllers: [MuestrasController, AnalistasController, AsignacionesController],
  providers: [MuestrasService, AnalistasService, AsignacionesService]
})
export class TallerModule {}

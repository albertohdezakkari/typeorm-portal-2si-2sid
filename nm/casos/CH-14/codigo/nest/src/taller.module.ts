import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parque } from './parques/entities/parque.entity';
import { Zona } from './zonas/entities/zona.entity';
import { ZonasService } from './zonas/zonas.service';
import { ZonasController } from './zonas/zonas.controller';
import { Jardinero } from './jardineros/entities/jardinero.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { JardinerosService } from './jardineros/jardineros.service';
import { JardinerosController } from './jardineros/jardineros.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Parque, Zona, Jardinero, Asignacion])],
  controllers: [ZonasController, JardinerosController, AsignacionesController],
  providers: [ZonasService, JardinerosService, AsignacionesService]
})
export class TallerModule {}

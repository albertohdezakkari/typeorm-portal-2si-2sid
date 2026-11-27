import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vivero } from './viveros/entities/vivero.entity';
import { Planta } from './plantas/entities/planta.entity';
import { PlantasService } from './plantas/plantas.service';
import { PlantasController } from './plantas/plantas.controller';
import { Jardinero } from './jardineros/entities/jardinero.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { JardinerosService } from './jardineros/jardineros.service';
import { JardinerosController } from './jardineros/jardineros.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vivero, Planta, Jardinero, Asignacion])],
  controllers: [PlantasController, JardinerosController, AsignacionesController],
  providers: [PlantasService, JardinerosService, AsignacionesService]
})
export class TallerModule {}

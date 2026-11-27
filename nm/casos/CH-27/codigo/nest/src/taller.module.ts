import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Urbanizacion } from './urbanizaciones/entities/urbanizacion.entity';
import { Plaza } from './plazas/entities/plaza.entity';
import { PlazasService } from './plazas/plazas.service';
import { PlazasController } from './plazas/plazas.controller';
import { Tecnico } from './tecnicos/entities/tecnico.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { TecnicosService } from './tecnicos/tecnicos.service';
import { TecnicosController } from './tecnicos/tecnicos.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Urbanizacion, Plaza, Tecnico, Asignacion])],
  controllers: [PlazasController, TecnicosController, AsignacionesController],
  providers: [PlazasService, TecnicosService, AsignacionesService]
})
export class TallerModule {}

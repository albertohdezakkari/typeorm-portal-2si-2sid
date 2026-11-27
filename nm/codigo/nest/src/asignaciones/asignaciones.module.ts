import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Obra } from '../obras/entities/obra.entity';
import { Profesional } from '../profesionales/entities/profesional.entity';
import { AsignacionesService } from './asignaciones.service';
import { AsignacionesController } from './asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Asignacion, Obra, Profesional])],
  providers: [AsignacionesService],
  controllers: [AsignacionesController]
})
export class AsignacionesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Granja } from './granjas/entities/granja.entity';
import { Cosecha } from './cosechas/entities/cosecha.entity';
import { CosechasService } from './cosechas/cosechas.service';
import { CosechasController } from './cosechas/cosechas.controller';
import { Agricultor } from './agricultores/entities/agricultor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { AgricultoresService } from './agricultores/agricultores.service';
import { AgricultoresController } from './agricultores/agricultores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Granja, Cosecha, Agricultor, Asignacion])],
  controllers: [CosechasController, AgricultoresController, AsignacionesController],
  providers: [CosechasService, AgricultoresService, AsignacionesService]
})
export class TallerModule {}

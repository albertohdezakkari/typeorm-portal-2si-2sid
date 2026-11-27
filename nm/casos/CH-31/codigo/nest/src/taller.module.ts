import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archivo } from './archivos/entities/archivo.entity';
import { Documento } from './documentos/entities/documento.entity';
import { DocumentosService } from './documentos/documentos.service';
import { DocumentosController } from './documentos/documentos.controller';
import { Revisor } from './revisores/entities/revisor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { RevisoresService } from './revisores/revisores.service';
import { RevisoresController } from './revisores/revisores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Archivo, Documento, Revisor, Asignacion])],
  controllers: [DocumentosController, RevisoresController, AsignacionesController],
  providers: [DocumentosService, RevisoresService, AsignacionesService]
})
export class TallerModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archivo } from '../archivos/entities/archivo.entity';
import { Documento } from './entities/documento.entity';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Archivo, Documento])],
  providers: [DocumentosService],
  controllers: [DocumentosController]
})
export class DocumentosModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archivo } from './entities/archivo.entity';
import { ArchivosService } from './archivos.service';
import { ArchivosController } from './archivos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Archivo])],
  providers: [ArchivosService],
  controllers: [ArchivosController]
})
export class ArchivosModule {}
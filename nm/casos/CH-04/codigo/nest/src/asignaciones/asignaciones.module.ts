import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Publicacion } from '../publicaciones/entities/publicacion.entity';
import { Autor } from '../autores/entities/autor.entity';
import { AsignacionesService } from './asignaciones.service';
import { AsignacionesController } from './asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Asignacion, Publicacion, Autor])],
  providers: [AsignacionesService],
  controllers: [AsignacionesController]
})
export class AsignacionesModule {}

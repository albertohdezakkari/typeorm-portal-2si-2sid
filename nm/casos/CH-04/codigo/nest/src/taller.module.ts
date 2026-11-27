import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Editorial } from './editoriales/entities/editorial.entity';
import { Publicacion } from './publicaciones/entities/publicacion.entity';
import { PublicacionesService } from './publicaciones/publicaciones.service';
import { PublicacionesController } from './publicaciones/publicaciones.controller';
import { Autor } from './autores/entities/autor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { AutoresService } from './autores/autores.service';
import { AutoresController } from './autores/autores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Editorial, Publicacion, Autor, Asignacion])],
  controllers: [PublicacionesController, AutoresController, AsignacionesController],
  providers: [PublicacionesService, AutoresService, AsignacionesService]
})
export class TallerModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Editorial } from '../editoriales/entities/editorial.entity';
import { Publicacion } from './entities/publicacion.entity';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Editorial, Publicacion])],
  providers: [PublicacionesService],
  controllers: [PublicacionesController]
})
export class PublicacionesModule {}

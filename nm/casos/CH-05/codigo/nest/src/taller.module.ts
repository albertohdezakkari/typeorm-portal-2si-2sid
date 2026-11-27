import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Festival } from './festivales/entities/festival.entity';
import { Actuacion } from './actuaciones/entities/actuacion.entity';
import { ActuacionesService } from './actuaciones/actuaciones.service';
import { ActuacionesController } from './actuaciones/actuaciones.controller';
import { Artista } from './artistas/entities/artista.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { ArtistasService } from './artistas/artistas.service';
import { ArtistasController } from './artistas/artistas.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Festival, Actuacion, Artista, Asignacion])],
  controllers: [ActuacionesController, ArtistasController, AsignacionesController],
  providers: [ActuacionesService, ArtistasService, AsignacionesService]
})
export class TallerModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artista } from './entities/artista.entity';
import { ArtistasService } from './artistas.service';
import { ArtistasController } from './artistas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Artista])],
  providers: [ArtistasService],
  controllers: [ArtistasController]
})
export class ArtistasModule {}

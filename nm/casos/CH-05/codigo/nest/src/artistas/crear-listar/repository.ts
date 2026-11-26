import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artista } from '../entities/artista.entity';

@Injectable()
export class ArtistasRepository {
  constructor(
    @InjectRepository(Artista) private readonly artistas: Repository<Artista>
  ) {}

  crearArtistaRepository(nombre: string, apellidos: string, email: string) {
    const artista = this.artistas.create({ nombre, apellidos, email });
    return this.artistas.save(artista);
  }

  listarArtistasRepository() {
    return this.artistas.find({ order: { id: 'ASC' } });
  }
}

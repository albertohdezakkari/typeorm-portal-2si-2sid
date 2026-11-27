import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artista } from './entities/artista.entity';

@Injectable()
export class ArtistasService {
  constructor(
    @InjectRepository(Artista) private readonly artistas: Repository<Artista>
  ) {}

  crearArtista(nombre: string, apellidos: string, email: string) {
    const artista = this.artistas.create({ nombre, apellidos, email });
    return this.artistas.save(artista);
  }

  listarArtistas() {
    return this.artistas.find({ order: { id: 'ASC' } });
  }
}

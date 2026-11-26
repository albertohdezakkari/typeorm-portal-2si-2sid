import { Injectable } from '@nestjs/common';
import { ArtistasRepository } from './repository';

@Injectable()
export class ArtistasService {
  constructor(private readonly repository: ArtistasRepository) {}

  crearArtistaService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearArtistaRepository(nombre, apellidos, email);
  }

  listarArtistasService() {
    return this.repository.listarArtistasRepository();
  }
}

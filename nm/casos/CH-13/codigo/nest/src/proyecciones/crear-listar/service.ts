import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearProyeccionService(pelicula: string, duracionMinutos: number, cineId: number) {
    return this.repository.crearProyeccionRepository(pelicula, duracionMinutos, cineId);
  }

  listarProyeccionesService() {
    return this.repository.listarProyeccionesRepository();
  }
}

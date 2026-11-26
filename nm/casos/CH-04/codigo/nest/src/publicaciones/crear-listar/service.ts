import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearPublicacionService(nombre: string, paginas: number, editorialId: number) {
    return this.repository.crearPublicacionRepository(nombre, paginas, editorialId);
  }

  listarPublicacionesService() {
    return this.repository.listarPublicacionesRepository();
  }
}

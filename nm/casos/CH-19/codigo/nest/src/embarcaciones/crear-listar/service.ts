import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearEmbarcacionService(nombre: string, esloraMetros: number, puertoId: number) {
    return this.repository.crearEmbarcacionRepository(nombre, esloraMetros, puertoId);
  }

  listarEmbarcacionesService() {
    return this.repository.listarEmbarcacionesRepository();
  }
}

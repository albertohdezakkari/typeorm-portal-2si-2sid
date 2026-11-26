import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearEscenaService(nombre: string, duracionSegundos: number, estudioId: number) {
    return this.repository.crearEscenaRepository(nombre, duracionSegundos, estudioId);
  }

  listarEscenasService() {
    return this.repository.listarEscenasRepository();
  }
}

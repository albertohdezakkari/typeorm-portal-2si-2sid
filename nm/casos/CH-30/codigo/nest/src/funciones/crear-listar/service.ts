import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearFuncionService(nombre: string, aforo: number, teatroId: number) {
    return this.repository.crearFuncionRepository(nombre, aforo, teatroId);
  }

  listarFuncionesService() {
    return this.repository.listarFuncionesRepository();
  }
}

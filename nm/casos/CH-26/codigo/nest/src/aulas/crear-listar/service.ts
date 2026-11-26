import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearAulaService(nombre: string, capacidad: number, escuelaId: number) {
    return this.repository.crearAulaRepository(nombre, capacidad, escuelaId);
  }

  listarAulasService() {
    return this.repository.listarAulasRepository();
  }
}

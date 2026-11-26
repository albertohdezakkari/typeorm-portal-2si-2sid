import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearPistaService(nombre: string, superficieM2: number, complejoId: number) {
    return this.repository.crearPistaRepository(nombre, superficieM2, complejoId);
  }

  listarPistasService() {
    return this.repository.listarPistasRepository();
  }
}

import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearExcursionService(nombre: string, duracionHoras: number, agenciaId: number) {
    return this.repository.crearExcursionRepository(nombre, duracionHoras, agenciaId);
  }

  listarExcursionesService() {
    return this.repository.listarExcursionesRepository();
  }
}

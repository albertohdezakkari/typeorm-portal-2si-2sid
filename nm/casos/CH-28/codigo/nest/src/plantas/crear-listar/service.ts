import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearPlantaService(nombre: string, alturaCm: number, viveroId: number) {
    return this.repository.crearPlantaRepository(nombre, alturaCm, viveroId);
  }

  listarPlantasService() {
    return this.repository.listarPlantasRepository();
  }
}

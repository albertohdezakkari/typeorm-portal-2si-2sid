import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearTrayectoService(nombre: string, distanciaKm: number, estacionId: number) {
    return this.repository.crearTrayectoRepository(nombre, distanciaKm, estacionId);
  }

  listarTrayectosService() {
    return this.repository.listarTrayectosRepository();
  }
}

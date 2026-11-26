import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearReparacionService(nombre: string, costeCentimos: number, tallerId: number) {
    return this.repository.crearReparacionRepository(nombre, costeCentimos, tallerId);
  }

  listarReparacionesService() {
    return this.repository.listarReparacionesRepository();
  }
}

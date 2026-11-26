import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearActuacionService(nombre: string, duracionMinutos: number, festivalId: number) {
    return this.repository.crearActuacionRepository(nombre, duracionMinutos, festivalId);
  }

  listarActuacionesService() {
    return this.repository.listarActuacionesRepository();
  }
}

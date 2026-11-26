import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearSesionService(nombre: string, plazas: number, gimnasioId: number) {
    return this.repository.crearSesionRepository(nombre, plazas, gimnasioId);
  }

  listarSesionesService() {
    return this.repository.listarSesionesRepository();
  }
}

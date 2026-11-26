import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearZonaService(nombre: string, capacidad: number, parqueId: number) {
    return this.repository.crearZonaRepository(nombre, capacidad, parqueId);
  }

  listarZonasService() {
    return this.repository.listarZonasRepository();
  }
}

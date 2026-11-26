import { Injectable } from '@nestjs/common';
import { ModificarCapacidadRepository } from './repository';

@Injectable()
export class ModificarCapacidadService {
  constructor(private readonly repository: ModificarCapacidadRepository) {}

  modificarCapacidadService(zonaId: number, capacidad: number) {
    return this.repository.modificarCapacidadRepository(zonaId, capacidad);
  }
}

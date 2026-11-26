import { Injectable } from '@nestjs/common';
import { ModificarCapacidadRepository } from './repository';

@Injectable()
export class ModificarCapacidadService {
  constructor(private readonly repository: ModificarCapacidadRepository) {}

  modificarCapacidadService(aulaId: number, capacidad: number) {
    return this.repository.modificarCapacidadRepository(aulaId, capacidad);
  }
}

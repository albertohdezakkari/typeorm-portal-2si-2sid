import { Injectable } from '@nestjs/common';
import { ModificarDistanciaKmRepository } from './repository';

@Injectable()
export class ModificarDistanciaKmService {
  constructor(private readonly repository: ModificarDistanciaKmRepository) {}

  modificarDistanciaKmService(trayectoId: number, distanciaKm: number) {
    return this.repository.modificarDistanciaKmRepository(trayectoId, distanciaKm);
  }
}

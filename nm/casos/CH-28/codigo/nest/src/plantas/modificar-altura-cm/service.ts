import { Injectable } from '@nestjs/common';
import { ModificarAlturaCmRepository } from './repository';

@Injectable()
export class ModificarAlturaCmService {
  constructor(private readonly repository: ModificarAlturaCmRepository) {}

  modificarAlturaCmService(plantaId: number, alturaCm: number) {
    return this.repository.modificarAlturaCmRepository(plantaId, alturaCm);
  }
}

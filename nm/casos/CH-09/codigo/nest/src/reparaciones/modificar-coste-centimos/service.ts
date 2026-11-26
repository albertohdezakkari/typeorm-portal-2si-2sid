import { Injectable } from '@nestjs/common';
import { ModificarCosteCentimosRepository } from './repository';

@Injectable()
export class ModificarCosteCentimosService {
  constructor(private readonly repository: ModificarCosteCentimosRepository) {}

  modificarCosteCentimosService(reparacionId: number, costeCentimos: number) {
    return this.repository.modificarCosteCentimosRepository(reparacionId, costeCentimos);
  }
}

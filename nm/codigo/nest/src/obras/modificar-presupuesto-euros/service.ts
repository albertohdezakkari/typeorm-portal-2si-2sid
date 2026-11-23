import { Injectable } from '@nestjs/common';
import { ModificarPresupuestoEurosRepository } from './repository';

@Injectable()
export class ModificarPresupuestoEurosService {
  constructor(private readonly repository: ModificarPresupuestoEurosRepository) {}

  modificarPresupuestoEurosService(obraId: number, presupuestoEuros: number) {
    return this.repository.modificarPresupuestoEurosRepository(obraId, presupuestoEuros);
  }
}

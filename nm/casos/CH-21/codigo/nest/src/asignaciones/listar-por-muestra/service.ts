import { Injectable } from '@nestjs/common';
import { ListarPorMuestraRepository } from './repository';

@Injectable()
export class ListarPorMuestraService {
  constructor(private readonly repository: ListarPorMuestraRepository) {}

  listarAsignacionesPorMuestraService(muestraId: number) {
    return this.repository.listarAsignacionesPorMuestraRepository(muestraId);
  }
}

import { Injectable } from '@nestjs/common';
import { ListarPorPiezaRepository } from './repository';

@Injectable()
export class ListarPorPiezaService {
  constructor(private readonly repository: ListarPorPiezaRepository) {}

  listarAsignacionesPorPiezaService(piezaId: number) {
    return this.repository.listarAsignacionesPorPiezaRepository(piezaId);
  }
}

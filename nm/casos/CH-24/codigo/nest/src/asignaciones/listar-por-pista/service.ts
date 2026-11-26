import { Injectable } from '@nestjs/common';
import { ListarPorPistaRepository } from './repository';

@Injectable()
export class ListarPorPistaService {
  constructor(private readonly repository: ListarPorPistaRepository) {}

  listarAsignacionesPorPistaService(pistaId: number) {
    return this.repository.listarAsignacionesPorPistaRepository(pistaId);
  }
}

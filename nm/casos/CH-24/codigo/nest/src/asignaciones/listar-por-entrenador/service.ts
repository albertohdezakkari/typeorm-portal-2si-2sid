import { Injectable } from '@nestjs/common';
import { ListarPorEntrenadorRepository } from './repository';

@Injectable()
export class ListarPorEntrenadorService {
  constructor(private readonly repository: ListarPorEntrenadorRepository) {}

  listarAsignacionesPorEntrenadorService(entrenadorId: number) {
    return this.repository.listarAsignacionesPorEntrenadorRepository(entrenadorId);
  }
}

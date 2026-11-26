import { Injectable } from '@nestjs/common';
import { ListarPorCuidadorRepository } from './repository';

@Injectable()
export class ListarPorCuidadorService {
  constructor(private readonly repository: ListarPorCuidadorRepository) {}

  listarAsignacionesPorCuidadorService(cuidadorId: number) {
    return this.repository.listarAsignacionesPorCuidadorRepository(cuidadorId);
  }
}

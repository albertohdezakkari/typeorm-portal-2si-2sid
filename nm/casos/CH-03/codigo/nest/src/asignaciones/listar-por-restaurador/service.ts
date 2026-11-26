import { Injectable } from '@nestjs/common';
import { ListarPorRestauradorRepository } from './repository';

@Injectable()
export class ListarPorRestauradorService {
  constructor(private readonly repository: ListarPorRestauradorRepository) {}

  listarAsignacionesPorRestauradorService(restauradorId: number) {
    return this.repository.listarAsignacionesPorRestauradorRepository(restauradorId);
  }
}

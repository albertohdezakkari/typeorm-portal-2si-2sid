import { Injectable } from '@nestjs/common';
import { ListarPorComandaRepository } from './repository';

@Injectable()
export class ListarPorComandaService {
  constructor(private readonly repository: ListarPorComandaRepository) {}

  listarAsignacionesPorComandaService(comandaId: number) {
    return this.repository.listarAsignacionesPorComandaRepository(comandaId);
  }
}

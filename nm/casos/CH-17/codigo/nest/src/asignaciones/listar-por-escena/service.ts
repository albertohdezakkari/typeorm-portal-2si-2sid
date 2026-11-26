import { Injectable } from '@nestjs/common';
import { ListarPorEscenaRepository } from './repository';

@Injectable()
export class ListarPorEscenaService {
  constructor(private readonly repository: ListarPorEscenaRepository) {}

  listarAsignacionesPorEscenaService(escenaId: number) {
    return this.repository.listarAsignacionesPorEscenaRepository(escenaId);
  }
}

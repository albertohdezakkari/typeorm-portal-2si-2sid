import { Injectable } from '@nestjs/common';
import { ListarPorAulaRepository } from './repository';

@Injectable()
export class ListarPorAulaService {
  constructor(private readonly repository: ListarPorAulaRepository) {}

  listarAsignacionesPorAulaService(aulaId: number) {
    return this.repository.listarAsignacionesPorAulaRepository(aulaId);
  }
}

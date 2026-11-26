import { Injectable } from '@nestjs/common';
import { ListarPorExcursionRepository } from './repository';

@Injectable()
export class ListarPorExcursionService {
  constructor(private readonly repository: ListarPorExcursionRepository) {}

  listarAsignacionesPorExcursionService(excursionId: number) {
    return this.repository.listarAsignacionesPorExcursionRepository(excursionId);
  }
}

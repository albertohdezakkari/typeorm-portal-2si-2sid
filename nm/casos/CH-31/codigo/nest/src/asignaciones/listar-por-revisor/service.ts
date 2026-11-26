import { Injectable } from '@nestjs/common';
import { ListarPorRevisorRepository } from './repository';

@Injectable()
export class ListarPorRevisorService {
  constructor(private readonly repository: ListarPorRevisorRepository) {}

  listarAsignacionesPorRevisorService(revisorId: number) {
    return this.repository.listarAsignacionesPorRevisorRepository(revisorId);
  }
}

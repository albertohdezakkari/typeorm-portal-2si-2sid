import { Injectable } from '@nestjs/common';
import { ListarPorFuncionRepository } from './repository';

@Injectable()
export class ListarPorFuncionService {
  constructor(private readonly repository: ListarPorFuncionRepository) {}

  listarAsignacionesPorFuncionService(funcionId: number) {
    return this.repository.listarAsignacionesPorFuncionRepository(funcionId);
  }
}

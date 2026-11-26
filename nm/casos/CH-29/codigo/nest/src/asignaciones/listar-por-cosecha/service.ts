import { Injectable } from '@nestjs/common';
import { ListarPorCosechaRepository } from './repository';

@Injectable()
export class ListarPorCosechaService {
  constructor(private readonly repository: ListarPorCosechaRepository) {}

  listarAsignacionesPorCosechaService(cosechaId: number) {
    return this.repository.listarAsignacionesPorCosechaRepository(cosechaId);
  }
}

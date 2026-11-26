import { Injectable } from '@nestjs/common';
import { ListarPorConductorRepository } from './repository';

@Injectable()
export class ListarPorConductorService {
  constructor(private readonly repository: ListarPorConductorRepository) {}

  listarAsignacionesPorConductorService(conductorId: number) {
    return this.repository.listarAsignacionesPorConductorRepository(conductorId);
  }
}

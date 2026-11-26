import { Injectable } from '@nestjs/common';
import { ListarPorCultivadorRepository } from './repository';

@Injectable()
export class ListarPorCultivadorService {
  constructor(private readonly repository: ListarPorCultivadorRepository) {}

  listarAsignacionesPorCultivadorService(cultivadorId: number) {
    return this.repository.listarAsignacionesPorCultivadorRepository(cultivadorId);
  }
}

import { Injectable } from '@nestjs/common';
import { ListarPorPlantaRepository } from './repository';

@Injectable()
export class ListarPorPlantaService {
  constructor(private readonly repository: ListarPorPlantaRepository) {}

  listarAsignacionesPorPlantaService(plantaId: number) {
    return this.repository.listarAsignacionesPorPlantaRepository(plantaId);
  }
}

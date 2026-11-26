import { Injectable } from '@nestjs/common';
import { ListarPorTripulanteRepository } from './repository';

@Injectable()
export class ListarPorTripulanteService {
  constructor(private readonly repository: ListarPorTripulanteRepository) {}

  listarAsignacionesPorTripulanteService(tripulanteId: number) {
    return this.repository.listarAsignacionesPorTripulanteRepository(tripulanteId);
  }
}

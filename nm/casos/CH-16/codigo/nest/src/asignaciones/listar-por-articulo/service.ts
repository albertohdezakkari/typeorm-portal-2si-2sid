import { Injectable } from '@nestjs/common';
import { ListarPorArticuloRepository } from './repository';

@Injectable()
export class ListarPorArticuloService {
  constructor(private readonly repository: ListarPorArticuloRepository) {}

  listarAsignacionesPorArticuloService(articuloId: number) {
    return this.repository.listarAsignacionesPorArticuloRepository(articuloId);
  }
}

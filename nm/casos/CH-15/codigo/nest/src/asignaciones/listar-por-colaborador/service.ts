import { Injectable } from '@nestjs/common';
import { ListarPorColaboradorRepository } from './repository';

@Injectable()
export class ListarPorColaboradorService {
  constructor(private readonly repository: ListarPorColaboradorRepository) {}

  listarAsignacionesPorColaboradorService(colaboradorId: number) {
    return this.repository.listarAsignacionesPorColaboradorRepository(colaboradorId);
  }
}

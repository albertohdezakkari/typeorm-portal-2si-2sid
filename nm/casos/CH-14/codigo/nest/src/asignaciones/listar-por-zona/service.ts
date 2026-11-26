import { Injectable } from '@nestjs/common';
import { ListarPorZonaRepository } from './repository';

@Injectable()
export class ListarPorZonaService {
  constructor(private readonly repository: ListarPorZonaRepository) {}

  listarAsignacionesPorZonaService(zonaId: number) {
    return this.repository.listarAsignacionesPorZonaRepository(zonaId);
  }
}

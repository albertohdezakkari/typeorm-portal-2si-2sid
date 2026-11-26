import { Injectable } from '@nestjs/common';
import { ListarPorPlazaRepository } from './repository';

@Injectable()
export class ListarPorPlazaService {
  constructor(private readonly repository: ListarPorPlazaRepository) {}

  listarAsignacionesPorPlazaService(plazaId: number) {
    return this.repository.listarAsignacionesPorPlazaRepository(plazaId);
  }
}

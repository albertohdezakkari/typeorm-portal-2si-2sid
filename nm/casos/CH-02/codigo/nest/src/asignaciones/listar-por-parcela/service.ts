import { Injectable } from '@nestjs/common';
import { ListarPorParcelaRepository } from './repository';

@Injectable()
export class ListarPorParcelaService {
  constructor(private readonly repository: ListarPorParcelaRepository) {}

  listarAsignacionesPorParcelaService(parcelaId: number) {
    return this.repository.listarAsignacionesPorParcelaRepository(parcelaId);
  }
}

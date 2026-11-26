import { Injectable } from '@nestjs/common';
import { ListarPorLoteRepository } from './repository';

@Injectable()
export class ListarPorLoteService {
  constructor(private readonly repository: ListarPorLoteRepository) {}

  listarAsignacionesPorLoteService(loteId: number) {
    return this.repository.listarAsignacionesPorLoteRepository(loteId);
  }
}

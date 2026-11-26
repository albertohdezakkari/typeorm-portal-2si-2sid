import { Injectable } from '@nestjs/common';
import { ListarPorEmbarcacionRepository } from './repository';

@Injectable()
export class ListarPorEmbarcacionService {
  constructor(private readonly repository: ListarPorEmbarcacionRepository) {}

  listarAsignacionesPorEmbarcacionService(embarcacionId: number) {
    return this.repository.listarAsignacionesPorEmbarcacionRepository(embarcacionId);
  }
}

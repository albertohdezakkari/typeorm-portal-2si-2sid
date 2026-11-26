import { Injectable } from '@nestjs/common';
import { ListarPorAnalistaRepository } from './repository';

@Injectable()
export class ListarPorAnalistaService {
  constructor(private readonly repository: ListarPorAnalistaRepository) {}

  listarAsignacionesPorAnalistaService(analistaId: number) {
    return this.repository.listarAsignacionesPorAnalistaRepository(analistaId);
  }
}

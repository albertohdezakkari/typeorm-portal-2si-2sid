import { Injectable } from '@nestjs/common';
import { ListarPorInspectorRepository } from './repository';

@Injectable()
export class ListarPorInspectorService {
  constructor(private readonly repository: ListarPorInspectorRepository) {}

  listarAsignacionesPorInspectorService(inspectorId: number) {
    return this.repository.listarAsignacionesPorInspectorRepository(inspectorId);
  }
}

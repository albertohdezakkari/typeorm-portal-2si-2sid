import { Injectable } from '@nestjs/common';
import { ListarPorMonitorRepository } from './repository';

@Injectable()
export class ListarPorMonitorService {
  constructor(private readonly repository: ListarPorMonitorRepository) {}

  listarAsignacionesPorMonitorService(monitorId: number) {
    return this.repository.listarAsignacionesPorMonitorRepository(monitorId);
  }
}

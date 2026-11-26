import { Injectable } from '@nestjs/common';
import { ListarPorActuacionRepository } from './repository';

@Injectable()
export class ListarPorActuacionService {
  constructor(private readonly repository: ListarPorActuacionRepository) {}

  listarAsignacionesPorActuacionService(actuacionId: number) {
    return this.repository.listarAsignacionesPorActuacionRepository(actuacionId);
  }
}

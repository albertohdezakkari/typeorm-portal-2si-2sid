import { Injectable } from '@nestjs/common';
import { ListarPorReparacionRepository } from './repository';

@Injectable()
export class ListarPorReparacionService {
  constructor(private readonly repository: ListarPorReparacionRepository) {}

  listarAsignacionesPorReparacionService(reparacionId: number) {
    return this.repository.listarAsignacionesPorReparacionRepository(reparacionId);
  }
}

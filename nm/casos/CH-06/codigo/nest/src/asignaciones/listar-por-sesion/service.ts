import { Injectable } from '@nestjs/common';
import { ListarPorSesionRepository } from './repository';

@Injectable()
export class ListarPorSesionService {
  constructor(private readonly repository: ListarPorSesionRepository) {}

  listarAsignacionesPorSesionService(sesionId: number) {
    return this.repository.listarAsignacionesPorSesionRepository(sesionId);
  }
}

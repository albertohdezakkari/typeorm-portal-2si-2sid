import { Injectable } from '@nestjs/common';
import { ListarPorTrayectoRepository } from './repository';

@Injectable()
export class ListarPorTrayectoService {
  constructor(private readonly repository: ListarPorTrayectoRepository) {}

  listarAsignacionesPorTrayectoService(trayectoId: number) {
    return this.repository.listarAsignacionesPorTrayectoRepository(trayectoId);
  }
}

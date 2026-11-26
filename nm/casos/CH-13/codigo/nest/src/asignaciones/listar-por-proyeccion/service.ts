import { Injectable } from '@nestjs/common';
import { ListarPorProyeccionRepository } from './repository';

@Injectable()
export class ListarPorProyeccionService {
  constructor(private readonly repository: ListarPorProyeccionRepository) {}

  listarAsignacionesPorProyeccionService(proyeccionId: number) {
    return this.repository.listarAsignacionesPorProyeccionRepository(proyeccionId);
  }
}

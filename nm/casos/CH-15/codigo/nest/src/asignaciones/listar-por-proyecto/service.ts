import { Injectable } from '@nestjs/common';
import { ListarPorProyectoRepository } from './repository';

@Injectable()
export class ListarPorProyectoService {
  constructor(private readonly repository: ListarPorProyectoRepository) {}

  listarAsignacionesPorProyectoService(proyectoId: number) {
    return this.repository.listarAsignacionesPorProyectoRepository(proyectoId);
  }
}

import { Injectable } from '@nestjs/common';
import { ListarPorActividadRepository } from './repository';

@Injectable()
export class ListarPorActividadService {
  constructor(private readonly repository: ListarPorActividadRepository) {}

  listarAsignacionesPorActividadService(actividadId: number) {
    return this.repository.listarAsignacionesPorActividadRepository(actividadId);
  }
}

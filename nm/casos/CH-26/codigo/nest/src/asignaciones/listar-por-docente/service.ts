import { Injectable } from '@nestjs/common';
import { ListarPorDocenteRepository } from './repository';

@Injectable()
export class ListarPorDocenteService {
  constructor(private readonly repository: ListarPorDocenteRepository) {}

  listarAsignacionesPorDocenteService(docenteId: number) {
    return this.repository.listarAsignacionesPorDocenteRepository(docenteId);
  }
}

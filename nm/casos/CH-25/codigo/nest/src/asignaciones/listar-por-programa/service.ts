import { Injectable } from '@nestjs/common';
import { ListarPorProgramaRepository } from './repository';

@Injectable()
export class ListarPorProgramaService {
  constructor(private readonly repository: ListarPorProgramaRepository) {}

  listarAsignacionesPorProgramaService(programaId: number) {
    return this.repository.listarAsignacionesPorProgramaRepository(programaId);
  }
}

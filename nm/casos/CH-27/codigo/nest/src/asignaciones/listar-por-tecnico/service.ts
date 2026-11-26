import { Injectable } from '@nestjs/common';
import { ListarPorTecnicoRepository } from './repository';

@Injectable()
export class ListarPorTecnicoService {
  constructor(private readonly repository: ListarPorTecnicoRepository) {}

  listarAsignacionesPorTecnicoService(tecnicoId: number) {
    return this.repository.listarAsignacionesPorTecnicoRepository(tecnicoId);
  }
}

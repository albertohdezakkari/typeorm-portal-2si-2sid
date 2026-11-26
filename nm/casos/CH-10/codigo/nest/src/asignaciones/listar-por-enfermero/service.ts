import { Injectable } from '@nestjs/common';
import { ListarPorEnfermeroRepository } from './repository';

@Injectable()
export class ListarPorEnfermeroService {
  constructor(private readonly repository: ListarPorEnfermeroRepository) {}

  listarAsignacionesPorEnfermeroService(enfermeroId: number) {
    return this.repository.listarAsignacionesPorEnfermeroRepository(enfermeroId);
  }
}

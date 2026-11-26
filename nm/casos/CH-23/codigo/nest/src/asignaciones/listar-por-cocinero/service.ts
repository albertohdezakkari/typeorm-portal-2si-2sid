import { Injectable } from '@nestjs/common';
import { ListarPorCocineroRepository } from './repository';

@Injectable()
export class ListarPorCocineroService {
  constructor(private readonly repository: ListarPorCocineroRepository) {}

  listarAsignacionesPorCocineroService(cocineroId: number) {
    return this.repository.listarAsignacionesPorCocineroRepository(cocineroId);
  }
}

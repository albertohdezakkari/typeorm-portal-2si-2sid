import { Injectable } from '@nestjs/common';
import { ListarPorPanaderoRepository } from './repository';

@Injectable()
export class ListarPorPanaderoService {
  constructor(private readonly repository: ListarPorPanaderoRepository) {}

  listarAsignacionesPorPanaderoService(panaderoId: number) {
    return this.repository.listarAsignacionesPorPanaderoRepository(panaderoId);
  }
}

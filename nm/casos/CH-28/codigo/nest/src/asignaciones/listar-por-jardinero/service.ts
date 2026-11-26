import { Injectable } from '@nestjs/common';
import { ListarPorJardineroRepository } from './repository';

@Injectable()
export class ListarPorJardineroService {
  constructor(private readonly repository: ListarPorJardineroRepository) {}

  listarAsignacionesPorJardineroService(jardineroId: number) {
    return this.repository.listarAsignacionesPorJardineroRepository(jardineroId);
  }
}

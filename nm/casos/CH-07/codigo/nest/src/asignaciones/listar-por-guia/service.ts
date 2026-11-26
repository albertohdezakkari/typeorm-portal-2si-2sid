import { Injectable } from '@nestjs/common';
import { ListarPorGuiaRepository } from './repository';

@Injectable()
export class ListarPorGuiaService {
  constructor(private readonly repository: ListarPorGuiaRepository) {}

  listarAsignacionesPorGuiaService(guiaId: number) {
    return this.repository.listarAsignacionesPorGuiaRepository(guiaId);
  }
}

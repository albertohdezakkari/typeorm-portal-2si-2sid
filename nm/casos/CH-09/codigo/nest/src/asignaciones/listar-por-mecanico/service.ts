import { Injectable } from '@nestjs/common';
import { ListarPorMecanicoRepository } from './repository';

@Injectable()
export class ListarPorMecanicoService {
  constructor(private readonly repository: ListarPorMecanicoRepository) {}

  listarAsignacionesPorMecanicoService(mecanicoId: number) {
    return this.repository.listarAsignacionesPorMecanicoRepository(mecanicoId);
  }
}

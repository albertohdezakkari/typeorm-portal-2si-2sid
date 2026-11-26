import { Injectable } from '@nestjs/common';
import { ListarPorReservaRepository } from './repository';

@Injectable()
export class ListarPorReservaService {
  constructor(private readonly repository: ListarPorReservaRepository) {}

  listarAsignacionesPorReservaService(reservaId: number) {
    return this.repository.listarAsignacionesPorReservaRepository(reservaId);
  }
}

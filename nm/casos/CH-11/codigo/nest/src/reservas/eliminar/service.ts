import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarReservaService(reservaId: number) {
    return this.repository.eliminarReservaRepository(reservaId);
  }
}

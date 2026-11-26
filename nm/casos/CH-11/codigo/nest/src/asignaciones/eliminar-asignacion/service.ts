import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(reservaId: number, huespedId: number) {
    await this.repository.eliminarAsignacionRepository(reservaId, huespedId);
  }
}

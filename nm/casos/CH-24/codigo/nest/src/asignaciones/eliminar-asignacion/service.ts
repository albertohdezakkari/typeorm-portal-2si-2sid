import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(pistaId: number, entrenadorId: number) {
    await this.repository.eliminarAsignacionRepository(pistaId, entrenadorId);
  }
}

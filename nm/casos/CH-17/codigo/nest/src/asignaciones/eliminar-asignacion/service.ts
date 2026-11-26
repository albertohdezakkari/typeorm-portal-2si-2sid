import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(escenaId: number, actorId: number) {
    await this.repository.eliminarAsignacionRepository(escenaId, actorId);
  }
}

import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(cosechaId: number, agricultorId: number) {
    await this.repository.eliminarAsignacionRepository(cosechaId, agricultorId);
  }
}

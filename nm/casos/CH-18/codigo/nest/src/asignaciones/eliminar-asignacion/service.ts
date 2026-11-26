import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(actividadId: number, monitorId: number) {
    await this.repository.eliminarAsignacionRepository(actividadId, monitorId);
  }
}

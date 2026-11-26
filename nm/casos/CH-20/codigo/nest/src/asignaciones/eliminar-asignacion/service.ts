import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(trayectoId: number, conductorId: number) {
    await this.repository.eliminarAsignacionRepository(trayectoId, conductorId);
  }
}

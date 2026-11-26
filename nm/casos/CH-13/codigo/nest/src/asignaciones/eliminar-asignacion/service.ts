import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(proyeccionId: number, tecnicoId: number) {
    await this.repository.eliminarAsignacionRepository(proyeccionId, tecnicoId);
  }
}

import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(embarcacionId: number, tripulanteId: number) {
    await this.repository.eliminarAsignacionRepository(embarcacionId, tripulanteId);
  }
}

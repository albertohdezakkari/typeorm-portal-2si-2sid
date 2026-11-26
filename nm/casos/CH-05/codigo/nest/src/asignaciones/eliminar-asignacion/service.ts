import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(actuacionId: number, artistaId: number) {
    await this.repository.eliminarAsignacionRepository(actuacionId, artistaId);
  }
}

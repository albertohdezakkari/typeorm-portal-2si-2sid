import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(excursionId: number, guiaId: number) {
    await this.repository.eliminarAsignacionRepository(excursionId, guiaId);
  }
}

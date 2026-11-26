import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(sesionId: number, instructorId: number) {
    await this.repository.eliminarAsignacionRepository(sesionId, instructorId);
  }
}

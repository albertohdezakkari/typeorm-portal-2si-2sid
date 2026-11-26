import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(programaId: number, locutorId: number) {
    await this.repository.eliminarAsignacionRepository(programaId, locutorId);
  }
}

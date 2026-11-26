import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(documentoId: number, revisorId: number) {
    await this.repository.eliminarAsignacionRepository(documentoId, revisorId);
  }
}

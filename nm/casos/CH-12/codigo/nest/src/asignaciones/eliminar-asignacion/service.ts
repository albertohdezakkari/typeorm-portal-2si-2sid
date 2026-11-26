import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(loteId: number, inspectorId: number) {
    await this.repository.eliminarAsignacionRepository(loteId, inspectorId);
  }
}

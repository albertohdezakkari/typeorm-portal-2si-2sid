import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(muestraId: number, analistaId: number) {
    await this.repository.eliminarAsignacionRepository(muestraId, analistaId);
  }
}

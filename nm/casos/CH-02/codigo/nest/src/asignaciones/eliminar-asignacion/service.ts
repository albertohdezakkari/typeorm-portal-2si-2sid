import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(parcelaId: number, cultivadorId: number) {
    await this.repository.eliminarAsignacionRepository(parcelaId, cultivadorId);
  }
}

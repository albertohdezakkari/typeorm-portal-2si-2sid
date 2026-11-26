import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(piezaId: number, restauradorId: number) {
    await this.repository.eliminarAsignacionRepository(piezaId, restauradorId);
  }
}

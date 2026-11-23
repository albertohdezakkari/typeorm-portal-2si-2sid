import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(obraId: number, profesionalId: number) {
    await this.repository.eliminarAsignacionRepository(obraId, profesionalId);
  }
}

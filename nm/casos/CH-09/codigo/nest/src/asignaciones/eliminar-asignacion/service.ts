import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(reparacionId: number, mecanicoId: number) {
    await this.repository.eliminarAsignacionRepository(reparacionId, mecanicoId);
  }
}

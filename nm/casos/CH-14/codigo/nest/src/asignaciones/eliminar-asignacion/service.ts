import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(zonaId: number, jardineroId: number) {
    await this.repository.eliminarAsignacionRepository(zonaId, jardineroId);
  }
}

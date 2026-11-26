import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(publicacionId: number, autorId: number) {
    await this.repository.eliminarAsignacionRepository(publicacionId, autorId);
  }
}

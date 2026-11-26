import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(funcionId: number, interpreteId: number) {
    await this.repository.eliminarAsignacionRepository(funcionId, interpreteId);
  }
}

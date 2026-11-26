import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(plazaId: number, tecnicoId: number) {
    await this.repository.eliminarAsignacionRepository(plazaId, tecnicoId);
  }
}

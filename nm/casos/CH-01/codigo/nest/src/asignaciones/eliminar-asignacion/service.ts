import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(animalId: number, cuidadorId: number) {
    await this.repository.eliminarAsignacionRepository(animalId, cuidadorId);
  }
}

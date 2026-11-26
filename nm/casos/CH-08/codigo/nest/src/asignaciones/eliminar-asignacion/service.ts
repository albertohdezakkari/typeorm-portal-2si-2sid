import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(productoId: number, panaderoId: number) {
    await this.repository.eliminarAsignacionRepository(productoId, panaderoId);
  }
}

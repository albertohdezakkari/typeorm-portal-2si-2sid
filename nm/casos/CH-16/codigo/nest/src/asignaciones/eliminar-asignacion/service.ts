import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(articuloId: number, vendedorId: number) {
    await this.repository.eliminarAsignacionRepository(articuloId, vendedorId);
  }
}

import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarTrayectoService(trayectoId: number) {
    return this.repository.eliminarTrayectoRepository(trayectoId);
  }
}

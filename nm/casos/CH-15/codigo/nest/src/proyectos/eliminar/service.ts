import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarProyectoService(proyectoId: number) {
    return this.repository.eliminarProyectoRepository(proyectoId);
  }
}

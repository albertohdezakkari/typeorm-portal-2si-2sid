import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarProyeccionService(proyeccionId: number) {
    return this.repository.eliminarProyeccionRepository(proyeccionId);
  }
}

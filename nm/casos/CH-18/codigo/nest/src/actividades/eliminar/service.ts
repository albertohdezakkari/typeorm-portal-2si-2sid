import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarActividadService(actividadId: number) {
    return this.repository.eliminarActividadRepository(actividadId);
  }
}

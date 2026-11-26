import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarActuacionService(actuacionId: number) {
    return this.repository.eliminarActuacionRepository(actuacionId);
  }
}

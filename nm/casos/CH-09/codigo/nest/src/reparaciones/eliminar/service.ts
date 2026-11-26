import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarReparacionService(reparacionId: number) {
    return this.repository.eliminarReparacionRepository(reparacionId);
  }
}

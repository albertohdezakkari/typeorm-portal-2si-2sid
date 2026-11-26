import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarAulaService(aulaId: number) {
    return this.repository.eliminarAulaRepository(aulaId);
  }
}

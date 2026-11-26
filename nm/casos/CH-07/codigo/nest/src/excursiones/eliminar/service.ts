import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarExcursionService(excursionId: number) {
    return this.repository.eliminarExcursionRepository(excursionId);
  }
}

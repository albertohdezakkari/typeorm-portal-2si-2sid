import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarCosechaService(cosechaId: number) {
    return this.repository.eliminarCosechaRepository(cosechaId);
  }
}

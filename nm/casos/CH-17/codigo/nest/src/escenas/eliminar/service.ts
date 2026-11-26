import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarEscenaService(escenaId: number) {
    return this.repository.eliminarEscenaRepository(escenaId);
  }
}

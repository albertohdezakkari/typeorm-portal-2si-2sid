import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarPistaService(pistaId: number) {
    return this.repository.eliminarPistaRepository(pistaId);
  }
}

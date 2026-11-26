import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarPiezaService(piezaId: number) {
    return this.repository.eliminarPiezaRepository(piezaId);
  }
}

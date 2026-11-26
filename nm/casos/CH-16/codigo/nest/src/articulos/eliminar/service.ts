import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarArticuloService(articuloId: number) {
    return this.repository.eliminarArticuloRepository(articuloId);
  }
}

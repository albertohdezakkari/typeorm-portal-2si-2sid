import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarComandaService(comandaId: number) {
    return this.repository.eliminarComandaRepository(comandaId);
  }
}

import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarLoteService(loteId: number) {
    return this.repository.eliminarLoteRepository(loteId);
  }
}

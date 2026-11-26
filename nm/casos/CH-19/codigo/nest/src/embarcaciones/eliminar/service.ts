import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarEmbarcacionService(embarcacionId: number) {
    return this.repository.eliminarEmbarcacionRepository(embarcacionId);
  }
}

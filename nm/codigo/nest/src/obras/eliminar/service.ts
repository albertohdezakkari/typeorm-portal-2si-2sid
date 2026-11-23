import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarObraService(obraId: number) {
    return this.repository.eliminarObraRepository(obraId);
  }
}

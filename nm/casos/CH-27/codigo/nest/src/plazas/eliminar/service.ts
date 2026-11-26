import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarPlazaService(plazaId: number) {
    return this.repository.eliminarPlazaRepository(plazaId);
  }
}

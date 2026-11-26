import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarZonaService(zonaId: number) {
    return this.repository.eliminarZonaRepository(zonaId);
  }
}

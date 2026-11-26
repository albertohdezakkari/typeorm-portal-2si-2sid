import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarPlantaService(plantaId: number) {
    return this.repository.eliminarPlantaRepository(plantaId);
  }
}

import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarPlantaService(plantaId: number, viveroId: number) {
    return this.repository.trasladarPlantaRepository(plantaId, viveroId);
  }
}

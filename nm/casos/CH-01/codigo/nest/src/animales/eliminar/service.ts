import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarAnimalService(animalId: number) {
    return this.repository.eliminarAnimalRepository(animalId);
  }
}

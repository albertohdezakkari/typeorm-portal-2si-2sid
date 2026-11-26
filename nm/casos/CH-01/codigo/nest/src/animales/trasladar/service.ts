import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarAnimalService(animalId: number, refugioId: number) {
    return this.repository.trasladarAnimalRepository(animalId, refugioId);
  }
}

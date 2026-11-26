import { Injectable } from '@nestjs/common';
import { ModificarEdadMesesRepository } from './repository';

@Injectable()
export class ModificarEdadMesesService {
  constructor(private readonly repository: ModificarEdadMesesRepository) {}

  modificarEdadMesesService(animalId: number, edadMeses: number) {
    return this.repository.modificarEdadMesesRepository(animalId, edadMeses);
  }
}

import { Injectable } from '@nestjs/common';
import { ModificarKilosRepository } from './repository';

@Injectable()
export class ModificarKilosService {
  constructor(private readonly repository: ModificarKilosRepository) {}

  modificarKilosService(loteId: number, kilos: number) {
    return this.repository.modificarKilosRepository(loteId, kilos);
  }
}

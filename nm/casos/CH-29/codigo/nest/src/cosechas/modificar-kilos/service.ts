import { Injectable } from '@nestjs/common';
import { ModificarKilosRepository } from './repository';

@Injectable()
export class ModificarKilosService {
  constructor(private readonly repository: ModificarKilosRepository) {}

  modificarKilosService(cosechaId: number, kilos: number) {
    return this.repository.modificarKilosRepository(cosechaId, kilos);
  }
}

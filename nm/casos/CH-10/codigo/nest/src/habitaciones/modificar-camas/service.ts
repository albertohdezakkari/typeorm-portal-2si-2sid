import { Injectable } from '@nestjs/common';
import { ModificarCamasRepository } from './repository';

@Injectable()
export class ModificarCamasService {
  constructor(private readonly repository: ModificarCamasRepository) {}

  modificarCamasService(habitacionId: number, camas: number) {
    return this.repository.modificarCamasRepository(habitacionId, camas);
  }
}

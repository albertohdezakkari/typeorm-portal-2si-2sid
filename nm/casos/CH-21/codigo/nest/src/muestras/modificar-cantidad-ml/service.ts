import { Injectable } from '@nestjs/common';
import { ModificarCantidadMlRepository } from './repository';

@Injectable()
export class ModificarCantidadMlService {
  constructor(private readonly repository: ModificarCantidadMlRepository) {}

  modificarCantidadMlService(muestraId: number, cantidadMl: number) {
    return this.repository.modificarCantidadMlRepository(muestraId, cantidadMl);
  }
}

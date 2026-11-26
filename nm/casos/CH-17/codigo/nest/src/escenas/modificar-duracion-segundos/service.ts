import { Injectable } from '@nestjs/common';
import { ModificarDuracionSegundosRepository } from './repository';

@Injectable()
export class ModificarDuracionSegundosService {
  constructor(private readonly repository: ModificarDuracionSegundosRepository) {}

  modificarDuracionSegundosService(escenaId: number, duracionSegundos: number) {
    return this.repository.modificarDuracionSegundosRepository(escenaId, duracionSegundos);
  }
}

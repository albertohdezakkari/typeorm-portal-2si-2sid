import { Injectable } from '@nestjs/common';
import { ModificarDuracionMinutosRepository } from './repository';

@Injectable()
export class ModificarDuracionMinutosService {
  constructor(private readonly repository: ModificarDuracionMinutosRepository) {}

  modificarDuracionMinutosService(actuacionId: number, duracionMinutos: number) {
    return this.repository.modificarDuracionMinutosRepository(actuacionId, duracionMinutos);
  }
}

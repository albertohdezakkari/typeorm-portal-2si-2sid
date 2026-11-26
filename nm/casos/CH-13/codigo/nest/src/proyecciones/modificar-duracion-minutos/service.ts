import { Injectable } from '@nestjs/common';
import { ModificarDuracionMinutosRepository } from './repository';

@Injectable()
export class ModificarDuracionMinutosService {
  constructor(private readonly repository: ModificarDuracionMinutosRepository) {}

  modificarDuracionMinutosService(proyeccionId: number, duracionMinutos: number) {
    return this.repository.modificarDuracionMinutosRepository(proyeccionId, duracionMinutos);
  }
}

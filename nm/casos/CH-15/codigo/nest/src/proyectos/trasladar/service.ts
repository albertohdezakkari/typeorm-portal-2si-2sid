import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarProyectoService(proyectoId: number, empresaId: number) {
    return this.repository.trasladarProyectoRepository(proyectoId, empresaId);
  }
}

import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarProyeccionService(proyeccionId: number, cineId: number) {
    return this.repository.trasladarProyeccionRepository(proyeccionId, cineId);
  }
}

import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarArticuloService(articuloId: number, tiendaId: number) {
    return this.repository.trasladarArticuloRepository(articuloId, tiendaId);
  }
}

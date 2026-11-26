import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarPiezaService(piezaId: number, museoId: number) {
    return this.repository.trasladarPiezaRepository(piezaId, museoId);
  }
}

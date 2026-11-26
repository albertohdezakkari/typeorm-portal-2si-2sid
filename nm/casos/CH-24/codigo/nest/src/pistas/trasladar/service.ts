import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarPistaService(pistaId: number, complejoId: number) {
    return this.repository.trasladarPistaRepository(pistaId, complejoId);
  }
}

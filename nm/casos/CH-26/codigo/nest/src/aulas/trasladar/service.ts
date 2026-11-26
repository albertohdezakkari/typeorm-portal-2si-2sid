import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarAulaService(aulaId: number, escuelaId: number) {
    return this.repository.trasladarAulaRepository(aulaId, escuelaId);
  }
}

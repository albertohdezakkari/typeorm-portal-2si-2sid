import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarParcelaService(parcelaId: number, huertoId: number) {
    return this.repository.trasladarParcelaRepository(parcelaId, huertoId);
  }
}

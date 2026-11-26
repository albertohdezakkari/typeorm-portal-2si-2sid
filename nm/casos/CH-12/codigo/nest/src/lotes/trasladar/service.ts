import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarLoteService(loteId: number, cooperativaId: number) {
    return this.repository.trasladarLoteRepository(loteId, cooperativaId);
  }
}

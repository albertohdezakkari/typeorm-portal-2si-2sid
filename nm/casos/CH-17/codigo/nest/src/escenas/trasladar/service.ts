import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarEscenaService(escenaId: number, estudioId: number) {
    return this.repository.trasladarEscenaRepository(escenaId, estudioId);
  }
}

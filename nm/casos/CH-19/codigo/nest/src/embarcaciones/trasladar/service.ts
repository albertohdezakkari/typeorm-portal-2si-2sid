import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarEmbarcacionService(embarcacionId: number, puertoId: number) {
    return this.repository.trasladarEmbarcacionRepository(embarcacionId, puertoId);
  }
}

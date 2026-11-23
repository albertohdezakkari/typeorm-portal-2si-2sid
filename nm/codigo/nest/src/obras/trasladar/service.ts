import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarObraService(obraId: number, ayuntamientoId: number) {
    return this.repository.trasladarObraRepository(obraId, ayuntamientoId);
  }
}

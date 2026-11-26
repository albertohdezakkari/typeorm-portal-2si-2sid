import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarExcursionService(excursionId: number, agenciaId: number) {
    return this.repository.trasladarExcursionRepository(excursionId, agenciaId);
  }
}

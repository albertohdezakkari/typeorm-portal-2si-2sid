import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarCosechaService(cosechaId: number, granjaId: number) {
    return this.repository.trasladarCosechaRepository(cosechaId, granjaId);
  }
}

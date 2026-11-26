import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarMuestraService(muestraId: number, laboratorioId: number) {
    return this.repository.trasladarMuestraRepository(muestraId, laboratorioId);
  }
}

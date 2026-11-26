import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarPlazaService(plazaId: number, urbanizacionId: number) {
    return this.repository.trasladarPlazaRepository(plazaId, urbanizacionId);
  }
}

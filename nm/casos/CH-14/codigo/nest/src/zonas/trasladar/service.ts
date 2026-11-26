import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarZonaService(zonaId: number, parqueId: number) {
    return this.repository.trasladarZonaRepository(zonaId, parqueId);
  }
}

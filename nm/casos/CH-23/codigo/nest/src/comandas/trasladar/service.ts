import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarComandaService(comandaId: number, cafeteriaId: number) {
    return this.repository.trasladarComandaRepository(comandaId, cafeteriaId);
  }
}

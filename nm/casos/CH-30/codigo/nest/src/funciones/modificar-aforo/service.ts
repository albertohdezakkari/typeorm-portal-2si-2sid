import { Injectable } from '@nestjs/common';
import { ModificarAforoRepository } from './repository';

@Injectable()
export class ModificarAforoService {
  constructor(private readonly repository: ModificarAforoRepository) {}

  modificarAforoService(funcionId: number, aforo: number) {
    return this.repository.modificarAforoRepository(funcionId, aforo);
  }
}

import { Injectable } from '@nestjs/common';
import { ModificarAntiguedadAniosRepository } from './repository';

@Injectable()
export class ModificarAntiguedadAniosService {
  constructor(private readonly repository: ModificarAntiguedadAniosRepository) {}

  modificarAntiguedadAniosService(piezaId: number, antiguedadAnios: number) {
    return this.repository.modificarAntiguedadAniosRepository(piezaId, antiguedadAnios);
  }
}

import { Injectable } from '@nestjs/common';
import { ModificarNochesRepository } from './repository';

@Injectable()
export class ModificarNochesService {
  constructor(private readonly repository: ModificarNochesRepository) {}

  modificarNochesService(reservaId: number, noches: number) {
    return this.repository.modificarNochesRepository(reservaId, noches);
  }
}

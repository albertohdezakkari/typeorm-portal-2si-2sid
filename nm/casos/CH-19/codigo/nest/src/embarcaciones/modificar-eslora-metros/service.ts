import { Injectable } from '@nestjs/common';
import { ModificarEsloraMetrosRepository } from './repository';

@Injectable()
export class ModificarEsloraMetrosService {
  constructor(private readonly repository: ModificarEsloraMetrosRepository) {}

  modificarEsloraMetrosService(embarcacionId: number, esloraMetros: number) {
    return this.repository.modificarEsloraMetrosRepository(embarcacionId, esloraMetros);
  }
}

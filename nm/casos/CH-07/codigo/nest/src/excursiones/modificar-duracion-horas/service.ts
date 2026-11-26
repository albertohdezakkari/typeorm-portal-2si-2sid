import { Injectable } from '@nestjs/common';
import { ModificarDuracionHorasRepository } from './repository';

@Injectable()
export class ModificarDuracionHorasService {
  constructor(private readonly repository: ModificarDuracionHorasRepository) {}

  modificarDuracionHorasService(excursionId: number, duracionHoras: number) {
    return this.repository.modificarDuracionHorasRepository(excursionId, duracionHoras);
  }
}

import { Injectable } from '@nestjs/common';
import { ModificarHorasEstimadasRepository } from './repository';

@Injectable()
export class ModificarHorasEstimadasService {
  constructor(private readonly repository: ModificarHorasEstimadasRepository) {}

  modificarHorasEstimadasService(proyectoId: number, horasEstimadas: number) {
    return this.repository.modificarHorasEstimadasRepository(proyectoId, horasEstimadas);
  }
}

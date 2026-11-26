import { Injectable } from '@nestjs/common';
import { ConsultarUrbanizacionRepository } from './repository';

@Injectable()
export class ConsultarUrbanizacionService {
  constructor(private readonly repository: ConsultarUrbanizacionRepository) {}

  consultarUrbanizacionService(urbanizacionId: number, minimo: number) {
    return this.repository.consultarUrbanizacionRepository(urbanizacionId, minimo);
  }
}

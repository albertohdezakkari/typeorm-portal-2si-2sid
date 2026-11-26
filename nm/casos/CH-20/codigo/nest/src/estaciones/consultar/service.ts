import { Injectable } from '@nestjs/common';
import { ConsultarEstacionRepository } from './repository';

@Injectable()
export class ConsultarEstacionService {
  constructor(private readonly repository: ConsultarEstacionRepository) {}

  consultarEstacionService(estacionId: number, minimo: number) {
    return this.repository.consultarEstacionRepository(estacionId, minimo);
  }
}

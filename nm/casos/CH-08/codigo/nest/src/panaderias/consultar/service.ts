import { Injectable } from '@nestjs/common';
import { ConsultarPanaderiaRepository } from './repository';

@Injectable()
export class ConsultarPanaderiaService {
  constructor(private readonly repository: ConsultarPanaderiaRepository) {}

  consultarPanaderiaService(panaderiaId: number, minimo: number) {
    return this.repository.consultarPanaderiaRepository(panaderiaId, minimo);
  }
}

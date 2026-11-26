import { Injectable } from '@nestjs/common';
import { ConsultarParqueRepository } from './repository';

@Injectable()
export class ConsultarParqueService {
  constructor(private readonly repository: ConsultarParqueRepository) {}

  consultarParqueService(parqueId: number, minimo: number) {
    return this.repository.consultarParqueRepository(parqueId, minimo);
  }
}

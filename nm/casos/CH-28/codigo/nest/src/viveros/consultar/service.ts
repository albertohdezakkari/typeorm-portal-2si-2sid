import { Injectable } from '@nestjs/common';
import { ConsultarViveroRepository } from './repository';

@Injectable()
export class ConsultarViveroService {
  constructor(private readonly repository: ConsultarViveroRepository) {}

  consultarViveroService(viveroId: number, minimo: number) {
    return this.repository.consultarViveroRepository(viveroId, minimo);
  }
}

import { Injectable } from '@nestjs/common';
import { ConsultarMuseoRepository } from './repository';

@Injectable()
export class ConsultarMuseoService {
  constructor(private readonly repository: ConsultarMuseoRepository) {}

  consultarMuseoService(museoId: number, minimo: number) {
    return this.repository.consultarMuseoRepository(museoId, minimo);
  }
}

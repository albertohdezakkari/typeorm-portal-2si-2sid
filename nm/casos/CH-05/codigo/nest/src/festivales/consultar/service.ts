import { Injectable } from '@nestjs/common';
import { ConsultarFestivalRepository } from './repository';

@Injectable()
export class ConsultarFestivalService {
  constructor(private readonly repository: ConsultarFestivalRepository) {}

  consultarFestivalService(festivalId: number, minimo: number) {
    return this.repository.consultarFestivalRepository(festivalId, minimo);
  }
}

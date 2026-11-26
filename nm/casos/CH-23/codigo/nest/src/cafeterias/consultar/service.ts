import { Injectable } from '@nestjs/common';
import { ConsultarCafeteriaRepository } from './repository';

@Injectable()
export class ConsultarCafeteriaService {
  constructor(private readonly repository: ConsultarCafeteriaRepository) {}

  consultarCafeteriaService(cafeteriaId: number, minimo: number) {
    return this.repository.consultarCafeteriaRepository(cafeteriaId, minimo);
  }
}

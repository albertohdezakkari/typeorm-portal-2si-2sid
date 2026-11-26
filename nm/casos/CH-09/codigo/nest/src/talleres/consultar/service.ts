import { Injectable } from '@nestjs/common';
import { ConsultarTallerRepository } from './repository';

@Injectable()
export class ConsultarTallerService {
  constructor(private readonly repository: ConsultarTallerRepository) {}

  consultarTallerService(tallerId: number, minimo: number) {
    return this.repository.consultarTallerRepository(tallerId, minimo);
  }
}

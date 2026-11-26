import { Injectable } from '@nestjs/common';
import { ConsultarEditorialRepository } from './repository';

@Injectable()
export class ConsultarEditorialService {
  constructor(private readonly repository: ConsultarEditorialRepository) {}

  consultarEditorialService(editorialId: number, minimo: number) {
    return this.repository.consultarEditorialRepository(editorialId, minimo);
  }
}

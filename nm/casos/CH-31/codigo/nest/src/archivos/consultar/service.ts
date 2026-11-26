import { Injectable } from '@nestjs/common';
import { ConsultarArchivoRepository } from './repository';

@Injectable()
export class ConsultarArchivoService {
  constructor(private readonly repository: ConsultarArchivoRepository) {}

  consultarArchivoService(archivoId: number, minimo: number) {
    return this.repository.consultarArchivoRepository(archivoId, minimo);
  }
}

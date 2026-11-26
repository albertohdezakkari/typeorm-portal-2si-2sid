import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarDocumentoService(documentoId: number) {
    return this.repository.eliminarDocumentoRepository(documentoId);
  }
}

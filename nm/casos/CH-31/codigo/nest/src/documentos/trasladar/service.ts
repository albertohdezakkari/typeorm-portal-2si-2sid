import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarDocumentoService(documentoId: number, archivoId: number) {
    return this.repository.trasladarDocumentoRepository(documentoId, archivoId);
  }
}

import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearDocumentoService(nombre: string, paginas: number, archivoId: number) {
    return this.repository.crearDocumentoRepository(nombre, paginas, archivoId);
  }

  listarDocumentosService() {
    return this.repository.listarDocumentosRepository();
  }
}

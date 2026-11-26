import { Injectable } from '@nestjs/common';
import { ModificarImporteCentimosRepository } from './repository';

@Injectable()
export class ModificarImporteCentimosService {
  constructor(private readonly repository: ModificarImporteCentimosRepository) {}

  modificarImporteCentimosService(comandaId: number, importeCentimos: number) {
    return this.repository.modificarImporteCentimosRepository(comandaId, importeCentimos);
  }
}

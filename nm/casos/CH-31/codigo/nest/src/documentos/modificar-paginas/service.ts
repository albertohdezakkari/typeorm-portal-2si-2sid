import { Injectable } from '@nestjs/common';
import { ModificarPaginasRepository } from './repository';

@Injectable()
export class ModificarPaginasService {
  constructor(private readonly repository: ModificarPaginasRepository) {}

  modificarPaginasService(documentoId: number, paginas: number) {
    return this.repository.modificarPaginasRepository(documentoId, paginas);
  }
}

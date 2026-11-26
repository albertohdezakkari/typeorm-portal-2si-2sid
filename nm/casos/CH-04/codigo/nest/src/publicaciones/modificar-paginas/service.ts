import { Injectable } from '@nestjs/common';
import { ModificarPaginasRepository } from './repository';

@Injectable()
export class ModificarPaginasService {
  constructor(private readonly repository: ModificarPaginasRepository) {}

  modificarPaginasService(publicacionId: number, paginas: number) {
    return this.repository.modificarPaginasRepository(publicacionId, paginas);
  }
}

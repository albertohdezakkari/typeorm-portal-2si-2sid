import { Injectable } from '@nestjs/common';
import { ModificarPrecioCentimosRepository } from './repository';

@Injectable()
export class ModificarPrecioCentimosService {
  constructor(private readonly repository: ModificarPrecioCentimosRepository) {}

  modificarPrecioCentimosService(productoId: number, precioCentimos: number) {
    return this.repository.modificarPrecioCentimosRepository(productoId, precioCentimos);
  }
}

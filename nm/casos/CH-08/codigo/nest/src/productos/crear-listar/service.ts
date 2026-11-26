import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearProductoService(nombre: string, precioCentimos: number, panaderiaId: number) {
    return this.repository.crearProductoRepository(nombre, precioCentimos, panaderiaId);
  }

  listarProductosService() {
    return this.repository.listarProductosRepository();
  }
}

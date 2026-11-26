import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearArticuloService(nombre: string, stock: number, tiendaId: number) {
    return this.repository.crearArticuloRepository(nombre, stock, tiendaId);
  }

  listarArticulosService() {
    return this.repository.listarArticulosRepository();
  }
}

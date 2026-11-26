import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearMuestraService(nombre: string, cantidadMl: number, laboratorioId: number) {
    return this.repository.crearMuestraRepository(nombre, cantidadMl, laboratorioId);
  }

  listarMuestrasService() {
    return this.repository.listarMuestrasRepository();
  }
}

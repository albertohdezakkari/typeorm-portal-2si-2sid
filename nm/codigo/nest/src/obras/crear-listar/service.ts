import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearObraService(nombre: string, presupuestoEuros: number, ayuntamientoId: number) {
    return this.repository.crearObraRepository(nombre, presupuestoEuros, ayuntamientoId);
  }

  listarObrasService() {
    return this.repository.listarObrasRepository();
  }
}

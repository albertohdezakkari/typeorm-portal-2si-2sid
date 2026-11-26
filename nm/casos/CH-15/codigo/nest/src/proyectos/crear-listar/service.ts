import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearProyectoService(nombre: string, horasEstimadas: number, empresaId: number) {
    return this.repository.crearProyectoRepository(nombre, horasEstimadas, empresaId);
  }

  listarProyectosService() {
    return this.repository.listarProyectosRepository();
  }
}

import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearPlazaService(nombre: string, superficieM2: number, urbanizacionId: number) {
    return this.repository.crearPlazaRepository(nombre, superficieM2, urbanizacionId);
  }

  listarPlazasService() {
    return this.repository.listarPlazasRepository();
  }
}

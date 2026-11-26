import { Injectable } from '@nestjs/common';
import { InspectoresRepository } from './repository';

@Injectable()
export class InspectoresService {
  constructor(private readonly repository: InspectoresRepository) {}

  crearInspectorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearInspectorRepository(nombre, apellidos, email);
  }

  listarInspectoresService() {
    return this.repository.listarInspectoresRepository();
  }
}

import { Injectable } from '@nestjs/common';
import { CultivadoresRepository } from './repository';

@Injectable()
export class CultivadoresService {
  constructor(private readonly repository: CultivadoresRepository) {}

  crearCultivadorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearCultivadorRepository(nombre, apellidos, email);
  }

  listarCultivadoresService() {
    return this.repository.listarCultivadoresRepository();
  }
}

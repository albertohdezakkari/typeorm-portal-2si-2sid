import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearActividadService(nombre: string, plazas: number, clubId: number) {
    return this.repository.crearActividadRepository(nombre, plazas, clubId);
  }

  listarActividadesService() {
    return this.repository.listarActividadesRepository();
  }
}

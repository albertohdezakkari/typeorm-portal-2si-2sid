import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearHabitacionService(nombre: string, camas: number, hospitalId: number) {
    return this.repository.crearHabitacionRepository(nombre, camas, hospitalId);
  }

  listarHabitacionesService() {
    return this.repository.listarHabitacionesRepository();
  }
}

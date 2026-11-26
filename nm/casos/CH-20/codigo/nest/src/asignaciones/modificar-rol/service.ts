import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(trayectoId: number, conductorId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(trayectoId, conductorId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { trayectoId, conductorId, rol };
  }
}

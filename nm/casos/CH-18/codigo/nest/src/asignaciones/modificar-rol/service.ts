import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(actividadId: number, monitorId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(actividadId, monitorId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { actividadId, monitorId, rol };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(cosechaId: number, agricultorId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(cosechaId, agricultorId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { cosechaId, agricultorId, rol };
  }
}

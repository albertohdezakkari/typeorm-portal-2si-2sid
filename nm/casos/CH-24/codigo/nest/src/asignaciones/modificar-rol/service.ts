import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(pistaId: number, entrenadorId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(pistaId, entrenadorId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { pistaId, entrenadorId, rol };
  }
}

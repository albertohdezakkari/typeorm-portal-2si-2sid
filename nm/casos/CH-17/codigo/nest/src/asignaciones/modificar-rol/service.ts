import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(escenaId: number, actorId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(escenaId, actorId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { escenaId, actorId, rol };
  }
}

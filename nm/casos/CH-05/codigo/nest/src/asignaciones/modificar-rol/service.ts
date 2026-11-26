import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(actuacionId: number, artistaId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(actuacionId, artistaId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { actuacionId, artistaId, rol };
  }
}

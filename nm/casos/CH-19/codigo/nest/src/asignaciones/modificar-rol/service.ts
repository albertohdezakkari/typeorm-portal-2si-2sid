import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(embarcacionId: number, tripulanteId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(embarcacionId, tripulanteId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { embarcacionId, tripulanteId, rol };
  }
}

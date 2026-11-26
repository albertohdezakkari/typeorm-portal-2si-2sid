import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(plazaId: number, tecnicoId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(plazaId, tecnicoId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { plazaId, tecnicoId, rol };
  }
}

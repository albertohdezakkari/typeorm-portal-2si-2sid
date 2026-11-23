import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(obraId: number, profesionalId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(obraId, profesionalId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { obraId, profesionalId, rol };
  }
}

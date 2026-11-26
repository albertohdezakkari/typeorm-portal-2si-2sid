import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(piezaId: number, restauradorId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(piezaId, restauradorId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { piezaId, restauradorId, rol };
  }
}

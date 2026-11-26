import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(proyectoId: number, colaboradorId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(proyectoId, colaboradorId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { proyectoId, colaboradorId, rol };
  }
}

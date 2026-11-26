import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(aulaId: number, docenteId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(aulaId, docenteId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { aulaId, docenteId, rol };
  }
}

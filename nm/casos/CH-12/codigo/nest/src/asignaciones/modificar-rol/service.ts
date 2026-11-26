import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(loteId: number, inspectorId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(loteId, inspectorId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { loteId, inspectorId, rol };
  }
}

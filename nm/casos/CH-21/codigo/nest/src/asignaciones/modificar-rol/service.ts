import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(muestraId: number, analistaId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(muestraId, analistaId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { muestraId, analistaId, rol };
  }
}

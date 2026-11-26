import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(parcelaId: number, cultivadorId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(parcelaId, cultivadorId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { parcelaId, cultivadorId, rol };
  }
}

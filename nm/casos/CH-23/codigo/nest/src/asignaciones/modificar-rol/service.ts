import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(comandaId: number, cocineroId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(comandaId, cocineroId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { comandaId, cocineroId, rol };
  }
}

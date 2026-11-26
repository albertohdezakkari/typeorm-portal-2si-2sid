import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(funcionId: number, interpreteId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(funcionId, interpreteId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { funcionId, interpreteId, rol };
  }
}

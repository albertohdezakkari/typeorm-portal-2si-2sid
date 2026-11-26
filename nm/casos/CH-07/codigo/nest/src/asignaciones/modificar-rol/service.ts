import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(excursionId: number, guiaId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(excursionId, guiaId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { excursionId, guiaId, rol };
  }
}

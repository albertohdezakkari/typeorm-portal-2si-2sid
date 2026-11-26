import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(habitacionId: number, enfermeroId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(habitacionId, enfermeroId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { habitacionId, enfermeroId, rol };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(sesionId: number, instructorId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(sesionId, instructorId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { sesionId, instructorId, rol };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(programaId: number, locutorId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(programaId, locutorId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { programaId, locutorId, rol };
  }
}

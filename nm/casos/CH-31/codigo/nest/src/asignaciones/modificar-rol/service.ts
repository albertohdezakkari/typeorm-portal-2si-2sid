import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(documentoId: number, revisorId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(documentoId, revisorId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { documentoId, revisorId, rol };
  }
}

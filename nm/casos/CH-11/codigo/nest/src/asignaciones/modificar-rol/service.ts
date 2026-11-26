import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(reservaId: number, huespedId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(reservaId, huespedId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { reservaId, huespedId, rol };
  }
}

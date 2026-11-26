import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(zonaId: number, jardineroId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(zonaId, jardineroId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { zonaId, jardineroId, rol };
  }
}

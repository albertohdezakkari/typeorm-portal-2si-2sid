import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(animalId: number, cuidadorId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(animalId, cuidadorId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { animalId, cuidadorId, rol };
  }
}

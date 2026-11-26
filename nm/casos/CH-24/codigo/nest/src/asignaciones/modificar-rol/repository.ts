import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ModificarRolRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  async modificarRolRepository(pistaId: number, entrenadorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ pistaId, entrenadorId }, { rol });
    return resultado.affected;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ModificarRolRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  async modificarRolRepository(funcionId: number, interpreteId: number, rol: string) {
    const resultado = await this.asignaciones.update({ funcionId, interpreteId }, { rol });
    return resultado.affected;
  }
}

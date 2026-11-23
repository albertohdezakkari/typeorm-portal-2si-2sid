import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ModificarRolRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  async modificarRolRepository(obraId: number, profesionalId: number, rol: string) {
    const resultado = await this.asignaciones.update({ obraId, profesionalId }, { rol });
    return resultado.affected;
  }
}

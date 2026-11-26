import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Programa } from '../../programas/entities/programa.entity';
import { Locutor } from '../../locutores/entities/locutor.entity';

@Injectable()
export class AsignarLocutorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Programa) private readonly programas: Repository<Programa>,
    @InjectRepository(Locutor) private readonly locutores: Repository<Locutor>
  ) {}

  buscarProgramaRepository(programaId: number) {
    return this.programas.findOneBy({ id: programaId });
  }

  buscarLocutorRepository(locutorId: number) {
    return this.locutores.findOneBy({ id: locutorId });
  }

  async asignarLocutorRepository(programaId: number, locutorId: number, rol: string) {
    const asignacion = { programaId, locutorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

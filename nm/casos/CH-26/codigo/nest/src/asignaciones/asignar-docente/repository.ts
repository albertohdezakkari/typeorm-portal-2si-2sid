import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Aula } from '../../aulas/entities/aula.entity';
import { Docente } from '../../docentes/entities/docente.entity';

@Injectable()
export class AsignarDocenteRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Aula) private readonly aulas: Repository<Aula>,
    @InjectRepository(Docente) private readonly docentes: Repository<Docente>
  ) {}

  buscarAulaRepository(aulaId: number) {
    return this.aulas.findOneBy({ id: aulaId });
  }

  buscarDocenteRepository(docenteId: number) {
    return this.docentes.findOneBy({ id: docenteId });
  }

  async asignarDocenteRepository(aulaId: number, docenteId: number, rol: string) {
    const asignacion = { aulaId, docenteId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Obra } from '../../obras/entities/obra.entity';
import { Profesional } from '../../profesionales/entities/profesional.entity';

@Injectable()
export class AsignarProfesionalRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Obra) private readonly obras: Repository<Obra>,
    @InjectRepository(Profesional) private readonly profesionales: Repository<Profesional>
  ) {}

  buscarObraRepository(obraId: number) {
    return this.obras.findOneBy({ id: obraId });
  }

  buscarProfesionalRepository(profesionalId: number) {
    return this.profesionales.findOneBy({ id: profesionalId });
  }

  async asignarProfesionalRepository(obraId: number, profesionalId: number, rol: string) {
    const asignacion = { obraId, profesionalId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

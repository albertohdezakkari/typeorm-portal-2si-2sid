import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorCocineroRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorCocineroRepository(cocineroId: number) {
    return this.asignaciones.find({
      where: { cocineroId },
      order: { comandaId: 'ASC' }
    });
  }
}

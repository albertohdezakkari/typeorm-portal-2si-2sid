import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorHuespedRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorHuespedRepository(huespedId: number) {
    return this.asignaciones.find({
      where: { huespedId },
      order: { reservaId: 'ASC' }
    });
  }
}

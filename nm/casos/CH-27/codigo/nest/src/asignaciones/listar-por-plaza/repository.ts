import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorPlazaRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorPlazaRepository(plazaId: number) {
    return this.asignaciones.find({
      where: { plazaId },
      order: { tecnicoId: 'ASC' }
    });
  }
}

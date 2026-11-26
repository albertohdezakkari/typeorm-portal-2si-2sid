import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorPanaderoRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorPanaderoRepository(panaderoId: number) {
    return this.asignaciones.find({
      where: { panaderoId },
      order: { productoId: 'ASC' }
    });
  }
}

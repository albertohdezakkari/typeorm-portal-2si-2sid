import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorAgricultorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorAgricultorRepository(agricultorId: number) {
    return this.asignaciones.find({
      where: { agricultorId },
      order: { cosechaId: 'ASC' }
    });
  }
}

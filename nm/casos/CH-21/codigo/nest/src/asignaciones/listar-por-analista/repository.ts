import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorAnalistaRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorAnalistaRepository(analistaId: number) {
    return this.asignaciones.find({
      where: { analistaId },
      order: { muestraId: 'ASC' }
    });
  }
}

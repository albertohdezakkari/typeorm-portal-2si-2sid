import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorPublicacionRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorPublicacionRepository(publicacionId: number) {
    return this.asignaciones.find({
      where: { publicacionId },
      order: { autorId: 'ASC' }
    });
  }
}

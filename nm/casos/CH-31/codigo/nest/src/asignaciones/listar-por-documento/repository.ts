import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorDocumentoRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorDocumentoRepository(documentoId: number) {
    return this.asignaciones.find({
      where: { documentoId },
      order: { revisorId: 'ASC' }
    });
  }
}

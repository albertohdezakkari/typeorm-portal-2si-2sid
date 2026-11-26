import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class EliminarAsignacionRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  eliminarAsignacionRepository(zonaId: number, jardineroId: number) {
    return this.asignaciones.delete({ zonaId, jardineroId });
  }
}

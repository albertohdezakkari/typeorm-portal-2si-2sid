import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class EliminarAsignacionRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  eliminarAsignacionRepository(actividadId: number, monitorId: number) {
    return this.asignaciones.delete({ actividadId, monitorId });
  }
}

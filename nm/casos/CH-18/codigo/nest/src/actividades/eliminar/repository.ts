import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from '../entities/actividad.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Actividad) private readonly actividades: Repository<Actividad>
  ) {}

  async eliminarActividadRepository(actividadId: number) {
    await this.actividades.delete(actividadId);
  }
}

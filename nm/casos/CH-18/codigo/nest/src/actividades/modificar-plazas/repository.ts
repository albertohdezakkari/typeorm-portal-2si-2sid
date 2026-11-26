import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from '../entities/actividad.entity';

@Injectable()
export class ModificarPlazasRepository {
  constructor(
    @InjectRepository(Actividad) private readonly actividades: Repository<Actividad>
  ) {}

  async modificarPlazasRepository(actividadId: number, plazas: number) {
    await this.actividades.update(actividadId, { plazas });
    return this.actividades.createQueryBuilder('p')
      .where('p.id = :actividadId', { actividadId }).getOne();
  }
}

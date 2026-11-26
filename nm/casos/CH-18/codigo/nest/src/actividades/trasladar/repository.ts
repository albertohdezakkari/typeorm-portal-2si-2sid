import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from '../entities/actividad.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Actividad) private readonly actividades: Repository<Actividad>
  ) {}

  async trasladarActividadRepository(actividadId: number, clubId: number) {
    await this.actividades.update(actividadId, { club: { id: clubId } });
    return this.actividades.createQueryBuilder('p')
      .where('p.id = :actividadId', { actividadId }).getOne();
  }
}

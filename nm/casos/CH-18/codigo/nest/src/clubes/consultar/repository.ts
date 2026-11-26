import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from '../../actividades/entities/actividad.entity';
import { Club } from '../entities/club.entity';

@Injectable()
export class ConsultarClubRepository {
  constructor(
    @InjectRepository(Actividad) private readonly actividades: Repository<Actividad>,
    @InjectRepository(Club) private readonly clubes: Repository<Club>
  ) {}

  async consultarClubRepository(clubId: number, minimo: number) {
    const club = await this.clubes.createQueryBuilder('h')
      .where('h.id = :clubId', { clubId }).getOne();
    const actividades = await this.actividades.createQueryBuilder('p')
      .innerJoin('p.club', 'h')
      .where('h.id = :clubId', { clubId })
      .andWhere('p.plazas >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { club, actividades };
  }
}

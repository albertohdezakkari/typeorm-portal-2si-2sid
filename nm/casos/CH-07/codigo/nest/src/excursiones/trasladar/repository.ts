import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Excursion } from '../entities/excursion.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Excursion) private readonly excursiones: Repository<Excursion>
  ) {}

  async trasladarExcursionRepository(excursionId: number, agenciaId: number) {
    await this.excursiones.update(excursionId, { agencia: { id: agenciaId } });
    return this.excursiones.createQueryBuilder('p')
      .where('p.id = :excursionId', { excursionId }).getOne();
  }
}

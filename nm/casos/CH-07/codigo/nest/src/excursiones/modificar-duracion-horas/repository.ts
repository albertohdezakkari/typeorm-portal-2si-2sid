import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Excursion } from '../entities/excursion.entity';

@Injectable()
export class ModificarDuracionHorasRepository {
  constructor(
    @InjectRepository(Excursion) private readonly excursiones: Repository<Excursion>
  ) {}

  async modificarDuracionHorasRepository(excursionId: number, duracionHoras: number) {
    await this.excursiones.update(excursionId, { duracionHoras });
    return this.excursiones.createQueryBuilder('p')
      .where('p.id = :excursionId', { excursionId }).getOne();
  }
}

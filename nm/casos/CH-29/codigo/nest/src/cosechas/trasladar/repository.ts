import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cosecha } from '../entities/cosecha.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Cosecha) private readonly cosechas: Repository<Cosecha>
  ) {}

  async trasladarCosechaRepository(cosechaId: number, granjaId: number) {
    await this.cosechas.update(cosechaId, { granja: { id: granjaId } });
    return this.cosechas.createQueryBuilder('p')
      .where('p.id = :cosechaId', { cosechaId }).getOne();
  }
}

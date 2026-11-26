import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from '../entities/lote.entity';

@Injectable()
export class ModificarKilosRepository {
  constructor(
    @InjectRepository(Lote) private readonly lotes: Repository<Lote>
  ) {}

  async modificarKilosRepository(loteId: number, kilos: number) {
    await this.lotes.update(loteId, { kilos });
    return this.lotes.createQueryBuilder('p')
      .where('p.id = :loteId', { loteId }).getOne();
  }
}

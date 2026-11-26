import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pieza } from '../entities/pieza.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Pieza) private readonly piezas: Repository<Pieza>
  ) {}

  async trasladarPiezaRepository(piezaId: number, museoId: number) {
    await this.piezas.update(piezaId, { museo: { id: museoId } });
    return this.piezas.createQueryBuilder('p')
      .where('p.id = :piezaId', { piezaId }).getOne();
  }
}

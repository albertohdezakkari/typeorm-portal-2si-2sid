import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pieza } from '../entities/pieza.entity';

@Injectable()
export class ModificarAntiguedadAniosRepository {
  constructor(
    @InjectRepository(Pieza) private readonly piezas: Repository<Pieza>
  ) {}

  async modificarAntiguedadAniosRepository(piezaId: number, antiguedadAnios: number) {
    await this.piezas.update(piezaId, { antiguedadAnios });
    return this.piezas.createQueryBuilder('p')
      .where('p.id = :piezaId', { piezaId }).getOne();
  }
}

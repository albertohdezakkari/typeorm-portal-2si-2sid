import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pista } from '../entities/pista.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Pista) private readonly pistas: Repository<Pista>
  ) {}

  async trasladarPistaRepository(pistaId: number, complejoId: number) {
    await this.pistas.update(pistaId, { complejo: { id: complejoId } });
    return this.pistas.createQueryBuilder('p')
      .where('p.id = :pistaId', { pistaId }).getOne();
  }
}

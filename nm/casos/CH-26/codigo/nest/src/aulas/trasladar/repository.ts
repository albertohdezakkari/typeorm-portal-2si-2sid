import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aula } from '../entities/aula.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Aula) private readonly aulas: Repository<Aula>
  ) {}

  async trasladarAulaRepository(aulaId: number, escuelaId: number) {
    await this.aulas.update(aulaId, { escuela: { id: escuelaId } });
    return this.aulas.createQueryBuilder('p')
      .where('p.id = :aulaId', { aulaId }).getOne();
  }
}

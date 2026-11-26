import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aula } from '../entities/aula.entity';

@Injectable()
export class ModificarCapacidadRepository {
  constructor(
    @InjectRepository(Aula) private readonly aulas: Repository<Aula>
  ) {}

  async modificarCapacidadRepository(aulaId: number, capacidad: number) {
    await this.aulas.update(aulaId, { capacidad });
    return this.aulas.createQueryBuilder('p')
      .where('p.id = :aulaId', { aulaId }).getOne();
  }
}

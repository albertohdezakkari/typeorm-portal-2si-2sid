import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pista } from '../entities/pista.entity';

@Injectable()
export class ModificarSuperficieM2Repository {
  constructor(
    @InjectRepository(Pista) private readonly pistas: Repository<Pista>
  ) {}

  async modificarSuperficieM2Repository(pistaId: number, superficieM2: number) {
    await this.pistas.update(pistaId, { superficieM2 });
    return this.pistas.createQueryBuilder('p')
      .where('p.id = :pistaId', { pistaId }).getOne();
  }
}

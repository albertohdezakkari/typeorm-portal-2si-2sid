import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plaza } from '../entities/plaza.entity';

@Injectable()
export class ModificarSuperficieM2Repository {
  constructor(
    @InjectRepository(Plaza) private readonly plazas: Repository<Plaza>
  ) {}

  async modificarSuperficieM2Repository(plazaId: number, superficieM2: number) {
    await this.plazas.update(plazaId, { superficieM2 });
    return this.plazas.createQueryBuilder('p')
      .where('p.id = :plazaId', { plazaId }).getOne();
  }
}

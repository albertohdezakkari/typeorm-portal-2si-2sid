import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cosecha } from '../entities/cosecha.entity';

@Injectable()
export class ModificarKilosRepository {
  constructor(
    @InjectRepository(Cosecha) private readonly cosechas: Repository<Cosecha>
  ) {}

  async modificarKilosRepository(cosechaId: number, kilos: number) {
    await this.cosechas.update(cosechaId, { kilos });
    return this.cosechas.createQueryBuilder('p')
      .where('p.id = :cosechaId', { cosechaId }).getOne();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actuacion } from '../entities/actuacion.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Actuacion) private readonly actuaciones: Repository<Actuacion>
  ) {}

  async trasladarActuacionRepository(actuacionId: number, festivalId: number) {
    await this.actuaciones.update(actuacionId, { festival: { id: festivalId } });
    return this.actuaciones.createQueryBuilder('p')
      .where('p.id = :actuacionId', { actuacionId }).getOne();
  }
}

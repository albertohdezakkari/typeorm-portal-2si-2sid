import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reparacion } from '../entities/reparacion.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Reparacion) private readonly reparaciones: Repository<Reparacion>
  ) {}

  async trasladarReparacionRepository(reparacionId: number, tallerId: number) {
    await this.reparaciones.update(reparacionId, { taller: { id: tallerId } });
    return this.reparaciones.createQueryBuilder('p')
      .where('p.id = :reparacionId', { reparacionId }).getOne();
  }
}

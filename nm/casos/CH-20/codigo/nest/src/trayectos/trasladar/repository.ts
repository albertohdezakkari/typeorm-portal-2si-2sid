import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trayecto } from '../entities/trayecto.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Trayecto) private readonly trayectos: Repository<Trayecto>
  ) {}

  async trasladarTrayectoRepository(trayectoId: number, estacionId: number) {
    await this.trayectos.update(trayectoId, { estacion: { id: estacionId } });
    return this.trayectos.createQueryBuilder('p')
      .where('p.id = :trayectoId', { trayectoId }).getOne();
  }
}

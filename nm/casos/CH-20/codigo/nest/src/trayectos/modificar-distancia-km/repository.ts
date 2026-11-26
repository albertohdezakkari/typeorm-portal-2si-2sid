import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trayecto } from '../entities/trayecto.entity';

@Injectable()
export class ModificarDistanciaKmRepository {
  constructor(
    @InjectRepository(Trayecto) private readonly trayectos: Repository<Trayecto>
  ) {}

  async modificarDistanciaKmRepository(trayectoId: number, distanciaKm: number) {
    await this.trayectos.update(trayectoId, { distanciaKm });
    return this.trayectos.createQueryBuilder('p')
      .where('p.id = :trayectoId', { trayectoId }).getOne();
  }
}

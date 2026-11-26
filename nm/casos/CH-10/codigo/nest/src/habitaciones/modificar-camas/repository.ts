import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitacion } from '../entities/habitacion.entity';

@Injectable()
export class ModificarCamasRepository {
  constructor(
    @InjectRepository(Habitacion) private readonly habitaciones: Repository<Habitacion>
  ) {}

  async modificarCamasRepository(habitacionId: number, camas: number) {
    await this.habitaciones.update(habitacionId, { camas });
    return this.habitaciones.createQueryBuilder('p')
      .where('p.id = :habitacionId', { habitacionId }).getOne();
  }
}

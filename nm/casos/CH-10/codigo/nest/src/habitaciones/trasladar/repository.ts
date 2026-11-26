import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitacion } from '../entities/habitacion.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Habitacion) private readonly habitaciones: Repository<Habitacion>
  ) {}

  async trasladarHabitacionRepository(habitacionId: number, hospitalId: number) {
    await this.habitaciones.update(habitacionId, { hospital: { id: hospitalId } });
    return this.habitaciones.createQueryBuilder('p')
      .where('p.id = :habitacionId', { habitacionId }).getOne();
  }
}

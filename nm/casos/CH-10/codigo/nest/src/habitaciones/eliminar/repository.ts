import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitacion } from '../entities/habitacion.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Habitacion) private readonly habitaciones: Repository<Habitacion>
  ) {}

  async eliminarHabitacionRepository(habitacionId: number) {
    await this.habitaciones.delete(habitacionId);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitacion } from '../entities/habitacion.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Habitacion) private readonly habitaciones: Repository<Habitacion>
  ) {}

  crearHabitacionRepository(nombre: string, camas: number, hospitalId: number) {
    const habitacion = this.habitaciones.create({
      nombre, camas, hospital: { id: hospitalId }
    });
    return this.habitaciones.save(habitacion);
  }

  listarHabitacionesRepository() {
    return this.habitaciones.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

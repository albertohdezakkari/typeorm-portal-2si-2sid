import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Habitacion } from '../../habitaciones/entities/habitacion.entity';
import { Enfermero } from '../../enfermeros/entities/enfermero.entity';

@Injectable()
export class AsignarEnfermeroRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Habitacion) private readonly habitaciones: Repository<Habitacion>,
    @InjectRepository(Enfermero) private readonly enfermeros: Repository<Enfermero>
  ) {}

  buscarHabitacionRepository(habitacionId: number) {
    return this.habitaciones.findOneBy({ id: habitacionId });
  }

  buscarEnfermeroRepository(enfermeroId: number) {
    return this.enfermeros.findOneBy({ id: enfermeroId });
  }

  async asignarEnfermeroRepository(habitacionId: number, enfermeroId: number, rol: string) {
    const asignacion = { habitacionId, enfermeroId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

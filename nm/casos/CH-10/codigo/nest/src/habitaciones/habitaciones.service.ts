import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Habitacion } from './entities/habitacion.entity';
import { Hospital } from '../hospitales/entities/hospital.entity';

@Injectable()
export class HabitacionesService {
  constructor(
    @InjectRepository(Habitacion) private readonly habitaciones: Repository<Habitacion>,
    @InjectRepository(Hospital) private readonly hospitales: Repository<Hospital>
  ) {}

  crearHabitacion(nombre: string, camas: number, hospitalId: number) {
    const habitacion = this.habitaciones.create({
      nombre,
      camas,
      hospital: { id: hospitalId }
    });
    return this.habitaciones.save(habitacion);
  }

  listarHabitaciones() {
    return this.habitaciones.find({ relations: { hospital: true }, order: { id: 'ASC' } });
  }

  async eliminarHabitacion(habitacionId: number) {
    await this.habitaciones.delete(habitacionId);
  }

  async modificarCamas(habitacionId: number, camas: number) {
    await this.habitaciones.update(habitacionId, { camas });
    return this.habitaciones.findOneBy({ id: habitacionId });
  }

  async cambiarHospital(habitacionId: number, hospitalId: number) {
    await this.habitaciones.update(habitacionId, { hospital: { id: hospitalId } });
    return this.habitaciones.findOneBy({ id: habitacionId });
  }

  async consultarHospital(hospitalId: number, minimo: number) {
    const hospital = await this.hospitales.findOneBy({ id: hospitalId });
    const habitaciones = await this.habitaciones.find({
      where: {
        hospital: { id: hospitalId },
        camas: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { hospital, habitaciones };
  }
}

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Habitacion } from '../habitaciones/entities/habitacion.entity';
import { Enfermero } from '../enfermeros/entities/enfermero.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Habitacion) private readonly habitaciones: Repository<Habitacion>,
    @InjectRepository(Enfermero) private readonly enfermeros: Repository<Enfermero>
  ) {}

  crearEnfermero(nombre: string, apellidos: string, email: string) {
    const enfermero = this.enfermeros.create({ nombre, apellidos, email });
    return this.enfermeros.save(enfermero);
  }

  listarEnfermeros() {
    return this.enfermeros.find({ order: { id: 'ASC' } });
  }

  async asignarEnfermero(habitacionId: number, enfermeroId: number, rol: string) {
    const habitacion = await this.habitaciones.findOneBy({ id: habitacionId });
    const enfermero = await this.enfermeros.findOneBy({ id: enfermeroId });
    if (!habitacion || !enfermero) {
      throw new NotFoundException('No existe la habitacion o el enfermero');
    }
    const asignacion = { habitacionId, enfermeroId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El enfermero ya está asignado a esa habitacion');
      }
      throw error;
    }
  }

  listarPorHabitacion(habitacionId: number) {
    return this.asignaciones.find({ where: { habitacionId }, order: { enfermeroId: 'ASC' } });
  }

  listarPorEnfermero(enfermeroId: number) {
    return this.asignaciones.find({ where: { enfermeroId }, order: { habitacionId: 'ASC' } });
  }

  async modificarRol(habitacionId: number, enfermeroId: number, rol: string) {
    const resultado = await this.asignaciones.update({ habitacionId, enfermeroId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { habitacionId, enfermeroId, rol };
  }

  async eliminarAsignacion(habitacionId: number, enfermeroId: number) {
    await this.asignaciones.delete({ habitacionId, enfermeroId });
  }
}

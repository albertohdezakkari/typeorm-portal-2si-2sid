import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Trayecto } from '../trayectos/entities/trayecto.entity';
import { Conductor } from '../conductores/entities/conductor.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Trayecto) private readonly trayectos: Repository<Trayecto>,
    @InjectRepository(Conductor) private readonly conductores: Repository<Conductor>
  ) {}

  crearConductor(nombre: string, apellidos: string, email: string) {
    const conductor = this.conductores.create({ nombre, apellidos, email });
    return this.conductores.save(conductor);
  }

  listarConductores() {
    return this.conductores.find({ order: { id: 'ASC' } });
  }

  async asignarConductor(trayectoId: number, conductorId: number, rol: string) {
    const trayecto = await this.trayectos.findOneBy({ id: trayectoId });
    const conductor = await this.conductores.findOneBy({ id: conductorId });
    if (!trayecto || !conductor) {
      throw new NotFoundException('No existe el trayecto o el conductor');
    }
    const asignacion = { trayectoId, conductorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El conductor ya está asignado a ese trayecto');
      }
      throw error;
    }
  }

  listarPorTrayecto(trayectoId: number) {
    return this.asignaciones.find({ where: { trayectoId }, order: { conductorId: 'ASC' } });
  }

  listarPorConductor(conductorId: number) {
    return this.asignaciones.find({ where: { conductorId }, order: { trayectoId: 'ASC' } });
  }

  async modificarRol(trayectoId: number, conductorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ trayectoId, conductorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { trayectoId, conductorId, rol };
  }

  async eliminarAsignacion(trayectoId: number, conductorId: number) {
    await this.asignaciones.delete({ trayectoId, conductorId });
  }
}

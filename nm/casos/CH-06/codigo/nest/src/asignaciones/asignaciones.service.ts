import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Sesion } from '../sesiones/entities/sesion.entity';
import { Instructor } from '../instructores/entities/instructor.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Sesion) private readonly sesiones: Repository<Sesion>,
    @InjectRepository(Instructor) private readonly instructores: Repository<Instructor>
  ) {}

  async asignarInstructor(sesionId: number, instructorId: number, rol: string) {
    const sesion = await this.sesiones.findOneBy({ id: sesionId });
    const instructor = await this.instructores.findOneBy({ id: instructorId });
    if (!sesion || !instructor) {
      throw new NotFoundException('No existe la sesion o el instructor');
    }
    const asignacion = { sesionId, instructorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El instructor ya está asignado a esa sesion');
      }
      throw error;
    }
  }

  listarPorSesion(sesionId: number) {
    return this.asignaciones.find({ where: { sesionId }, order: { instructorId: 'ASC' } });
  }

  listarPorInstructor(instructorId: number) {
    return this.asignaciones.find({ where: { instructorId }, order: { sesionId: 'ASC' } });
  }

  async modificarRol(sesionId: number, instructorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ sesionId, instructorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { sesionId, instructorId, rol };
  }

  async eliminarAsignacion(sesionId: number, instructorId: number) {
    await this.asignaciones.delete({ sesionId, instructorId });
  }
}

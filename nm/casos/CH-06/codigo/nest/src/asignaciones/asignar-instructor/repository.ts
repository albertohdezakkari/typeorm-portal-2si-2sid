import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Sesion } from '../../sesiones/entities/sesion.entity';
import { Instructor } from '../../instructores/entities/instructor.entity';

@Injectable()
export class AsignarInstructorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Sesion) private readonly sesiones: Repository<Sesion>,
    @InjectRepository(Instructor) private readonly instructores: Repository<Instructor>
  ) {}

  buscarSesionRepository(sesionId: number) {
    return this.sesiones.findOneBy({ id: sesionId });
  }

  buscarInstructorRepository(instructorId: number) {
    return this.instructores.findOneBy({ id: instructorId });
  }

  async asignarInstructorRepository(sesionId: number, instructorId: number, rol: string) {
    const asignacion = { sesionId, instructorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

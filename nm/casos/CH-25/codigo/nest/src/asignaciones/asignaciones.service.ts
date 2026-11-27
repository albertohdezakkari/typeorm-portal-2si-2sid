import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Programa } from '../programas/entities/programa.entity';
import { Locutor } from '../locutores/entities/locutor.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Programa) private readonly programas: Repository<Programa>,
    @InjectRepository(Locutor) private readonly locutores: Repository<Locutor>
  ) {}

  crearLocutor(nombre: string, apellidos: string, email: string) {
    const locutor = this.locutores.create({ nombre, apellidos, email });
    return this.locutores.save(locutor);
  }

  listarLocutores() {
    return this.locutores.find({ order: { id: 'ASC' } });
  }

  async asignarLocutor(programaId: number, locutorId: number, rol: string) {
    const programa = await this.programas.findOneBy({ id: programaId });
    const locutor = await this.locutores.findOneBy({ id: locutorId });
    if (!programa || !locutor) {
      throw new NotFoundException('No existe el programa o el locutor');
    }
    const asignacion = { programaId, locutorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El locutor ya está asignado a ese programa');
      }
      throw error;
    }
  }

  listarPorPrograma(programaId: number) {
    return this.asignaciones.find({ where: { programaId }, order: { locutorId: 'ASC' } });
  }

  listarPorLocutor(locutorId: number) {
    return this.asignaciones.find({ where: { locutorId }, order: { programaId: 'ASC' } });
  }

  async modificarRol(programaId: number, locutorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ programaId, locutorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { programaId, locutorId, rol };
  }

  async eliminarAsignacion(programaId: number, locutorId: number) {
    await this.asignaciones.delete({ programaId, locutorId });
  }
}

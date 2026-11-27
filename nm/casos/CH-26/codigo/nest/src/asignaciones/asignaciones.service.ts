import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Aula } from '../aulas/entities/aula.entity';
import { Docente } from '../docentes/entities/docente.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Aula) private readonly aulas: Repository<Aula>,
    @InjectRepository(Docente) private readonly docentes: Repository<Docente>
  ) {}

  crearDocente(nombre: string, apellidos: string, email: string) {
    const docente = this.docentes.create({ nombre, apellidos, email });
    return this.docentes.save(docente);
  }

  listarDocentes() {
    return this.docentes.find({ order: { id: 'ASC' } });
  }

  async asignarDocente(aulaId: number, docenteId: number, rol: string) {
    const aula = await this.aulas.findOneBy({ id: aulaId });
    const docente = await this.docentes.findOneBy({ id: docenteId });
    if (!aula || !docente) {
      throw new NotFoundException('No existe la aula o el docente');
    }
    const asignacion = { aulaId, docenteId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El docente ya está asignado a esa aula');
      }
      throw error;
    }
  }

  listarPorAula(aulaId: number) {
    return this.asignaciones.find({ where: { aulaId }, order: { docenteId: 'ASC' } });
  }

  listarPorDocente(docenteId: number) {
    return this.asignaciones.find({ where: { docenteId }, order: { aulaId: 'ASC' } });
  }

  async modificarRol(aulaId: number, docenteId: number, rol: string) {
    const resultado = await this.asignaciones.update({ aulaId, docenteId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { aulaId, docenteId, rol };
  }

  async eliminarAsignacion(aulaId: number, docenteId: number) {
    await this.asignaciones.delete({ aulaId, docenteId });
  }
}

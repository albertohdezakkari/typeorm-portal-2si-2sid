import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { Colaborador } from '../colaboradores/entities/colaborador.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Proyecto) private readonly proyectos: Repository<Proyecto>,
    @InjectRepository(Colaborador) private readonly colaboradores: Repository<Colaborador>
  ) {}

  async asignarColaborador(proyectoId: number, colaboradorId: number, rol: string) {
    const proyecto = await this.proyectos.findOneBy({ id: proyectoId });
    const colaborador = await this.colaboradores.findOneBy({ id: colaboradorId });
    if (!proyecto || !colaborador) {
      throw new NotFoundException('No existe el proyecto o el colaborador');
    }
    const asignacion = { proyectoId, colaboradorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El colaborador ya está asignado a ese proyecto');
      }
      throw error;
    }
  }

  listarPorProyecto(proyectoId: number) {
    return this.asignaciones.find({ where: { proyectoId }, order: { colaboradorId: 'ASC' } });
  }

  listarPorColaborador(colaboradorId: number) {
    return this.asignaciones.find({ where: { colaboradorId }, order: { proyectoId: 'ASC' } });
  }

  async modificarRol(proyectoId: number, colaboradorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ proyectoId, colaboradorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { proyectoId, colaboradorId, rol };
  }

  async eliminarAsignacion(proyectoId: number, colaboradorId: number) {
    await this.asignaciones.delete({ proyectoId, colaboradorId });
  }
}

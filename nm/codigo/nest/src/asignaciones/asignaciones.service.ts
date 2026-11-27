import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Obra } from '../obras/entities/obra.entity';
import { Profesional } from '../profesionales/entities/profesional.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Obra) private readonly obras: Repository<Obra>,
    @InjectRepository(Profesional) private readonly profesionales: Repository<Profesional>
  ) {}

  async asignarProfesional(obraId: number, profesionalId: number, rol: string) {
    const obra = await this.obras.findOneBy({ id: obraId });
    const profesional = await this.profesionales.findOneBy({ id: profesionalId });
    if (!obra || !profesional) {
      throw new NotFoundException('No existe la obra o el profesional');
    }
    const asignacion = { obraId, profesionalId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El profesional ya está asignado a esa obra');
      }
      throw error;
    }
  }

  listarPorObra(obraId: number) {
    return this.asignaciones.find({ where: { obraId }, order: { profesionalId: 'ASC' } });
  }

  listarPorProfesional(profesionalId: number) {
    return this.asignaciones.find({ where: { profesionalId }, order: { obraId: 'ASC' } });
  }

  async modificarRol(obraId: number, profesionalId: number, rol: string) {
    const resultado = await this.asignaciones.update({ obraId, profesionalId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { obraId, profesionalId, rol };
  }

  async eliminarAsignacion(obraId: number, profesionalId: number) {
    await this.asignaciones.delete({ obraId, profesionalId });
  }
}

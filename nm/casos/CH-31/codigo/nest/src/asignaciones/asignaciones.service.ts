import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Documento } from '../documentos/entities/documento.entity';
import { Revisor } from '../revisores/entities/revisor.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Documento) private readonly documentos: Repository<Documento>,
    @InjectRepository(Revisor) private readonly revisores: Repository<Revisor>
  ) {}

  crearRevisor(nombre: string, apellidos: string, email: string) {
    const revisor = this.revisores.create({ nombre, apellidos, email });
    return this.revisores.save(revisor);
  }

  listarRevisores() {
    return this.revisores.find({ order: { id: 'ASC' } });
  }

  async asignarRevisor(documentoId: number, revisorId: number, rol: string) {
    const documento = await this.documentos.findOneBy({ id: documentoId });
    const revisor = await this.revisores.findOneBy({ id: revisorId });
    if (!documento || !revisor) {
      throw new NotFoundException('No existe el documento o el revisor');
    }
    const asignacion = { documentoId, revisorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El revisor ya está asignado a ese documento');
      }
      throw error;
    }
  }

  listarPorDocumento(documentoId: number) {
    return this.asignaciones.find({ where: { documentoId }, order: { revisorId: 'ASC' } });
  }

  listarPorRevisor(revisorId: number) {
    return this.asignaciones.find({ where: { revisorId }, order: { documentoId: 'ASC' } });
  }

  async modificarRol(documentoId: number, revisorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ documentoId, revisorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { documentoId, revisorId, rol };
  }

  async eliminarAsignacion(documentoId: number, revisorId: number) {
    await this.asignaciones.delete({ documentoId, revisorId });
  }
}

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Lote } from '../lotes/entities/lote.entity';
import { Inspector } from '../inspectores/entities/inspector.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Lote) private readonly lotes: Repository<Lote>,
    @InjectRepository(Inspector) private readonly inspectores: Repository<Inspector>
  ) {}

  async asignarInspector(loteId: number, inspectorId: number, rol: string) {
    const lote = await this.lotes.findOneBy({ id: loteId });
    const inspector = await this.inspectores.findOneBy({ id: inspectorId });
    if (!lote || !inspector) {
      throw new NotFoundException('No existe el lote o el inspector');
    }
    const asignacion = { loteId, inspectorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El inspector ya está asignado a ese lote');
      }
      throw error;
    }
  }

  listarPorLote(loteId: number) {
    return this.asignaciones.find({ where: { loteId }, order: { inspectorId: 'ASC' } });
  }

  listarPorInspector(inspectorId: number) {
    return this.asignaciones.find({ where: { inspectorId }, order: { loteId: 'ASC' } });
  }

  async modificarRol(loteId: number, inspectorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ loteId, inspectorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { loteId, inspectorId, rol };
  }

  async eliminarAsignacion(loteId: number, inspectorId: number) {
    await this.asignaciones.delete({ loteId, inspectorId });
  }
}

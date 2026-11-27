import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Muestra } from '../muestras/entities/muestra.entity';
import { Analista } from '../analistas/entities/analista.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Muestra) private readonly muestras: Repository<Muestra>,
    @InjectRepository(Analista) private readonly analistas: Repository<Analista>
  ) {}

  async asignarAnalista(muestraId: number, analistaId: number, rol: string) {
    const muestra = await this.muestras.findOneBy({ id: muestraId });
    const analista = await this.analistas.findOneBy({ id: analistaId });
    if (!muestra || !analista) {
      throw new NotFoundException('No existe la muestra o el analista');
    }
    const asignacion = { muestraId, analistaId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El analista ya está asignado a esa muestra');
      }
      throw error;
    }
  }

  listarPorMuestra(muestraId: number) {
    return this.asignaciones.find({ where: { muestraId }, order: { analistaId: 'ASC' } });
  }

  listarPorAnalista(analistaId: number) {
    return this.asignaciones.find({ where: { analistaId }, order: { muestraId: 'ASC' } });
  }

  async modificarRol(muestraId: number, analistaId: number, rol: string) {
    const resultado = await this.asignaciones.update({ muestraId, analistaId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { muestraId, analistaId, rol };
  }

  async eliminarAsignacion(muestraId: number, analistaId: number) {
    await this.asignaciones.delete({ muestraId, analistaId });
  }
}

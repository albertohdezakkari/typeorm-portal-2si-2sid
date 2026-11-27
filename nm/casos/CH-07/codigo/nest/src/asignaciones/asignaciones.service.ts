import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Excursion } from '../excursiones/entities/excursion.entity';
import { Guia } from '../guias/entities/guia.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Excursion) private readonly excursiones: Repository<Excursion>,
    @InjectRepository(Guia) private readonly guias: Repository<Guia>
  ) {}

  crearGuia(nombre: string, apellidos: string, email: string) {
    const guia = this.guias.create({ nombre, apellidos, email });
    return this.guias.save(guia);
  }

  listarGuias() {
    return this.guias.find({ order: { id: 'ASC' } });
  }

  async asignarGuia(excursionId: number, guiaId: number, rol: string) {
    const excursion = await this.excursiones.findOneBy({ id: excursionId });
    const guia = await this.guias.findOneBy({ id: guiaId });
    if (!excursion || !guia) {
      throw new NotFoundException('No existe la excursion o el guia');
    }
    const asignacion = { excursionId, guiaId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El guia ya está asignado a esa excursion');
      }
      throw error;
    }
  }

  listarPorExcursion(excursionId: number) {
    return this.asignaciones.find({ where: { excursionId }, order: { guiaId: 'ASC' } });
  }

  listarPorGuia(guiaId: number) {
    return this.asignaciones.find({ where: { guiaId }, order: { excursionId: 'ASC' } });
  }

  async modificarRol(excursionId: number, guiaId: number, rol: string) {
    const resultado = await this.asignaciones.update({ excursionId, guiaId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { excursionId, guiaId, rol };
  }

  async eliminarAsignacion(excursionId: number, guiaId: number) {
    await this.asignaciones.delete({ excursionId, guiaId });
  }
}

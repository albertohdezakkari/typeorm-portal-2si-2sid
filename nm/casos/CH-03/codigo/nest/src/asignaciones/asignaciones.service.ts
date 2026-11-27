import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Pieza } from '../piezas/entities/pieza.entity';
import { Restaurador } from '../restauradores/entities/restaurador.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Pieza) private readonly piezas: Repository<Pieza>,
    @InjectRepository(Restaurador) private readonly restauradores: Repository<Restaurador>
  ) {}

  async asignarRestaurador(piezaId: number, restauradorId: number, rol: string) {
    const pieza = await this.piezas.findOneBy({ id: piezaId });
    const restaurador = await this.restauradores.findOneBy({ id: restauradorId });
    if (!pieza || !restaurador) {
      throw new NotFoundException('No existe la pieza o el restaurador');
    }
    const asignacion = { piezaId, restauradorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El restaurador ya está asignado a esa pieza');
      }
      throw error;
    }
  }

  listarPorPieza(piezaId: number) {
    return this.asignaciones.find({ where: { piezaId }, order: { restauradorId: 'ASC' } });
  }

  listarPorRestaurador(restauradorId: number) {
    return this.asignaciones.find({ where: { restauradorId }, order: { piezaId: 'ASC' } });
  }

  async modificarRol(piezaId: number, restauradorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ piezaId, restauradorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { piezaId, restauradorId, rol };
  }

  async eliminarAsignacion(piezaId: number, restauradorId: number) {
    await this.asignaciones.delete({ piezaId, restauradorId });
  }
}

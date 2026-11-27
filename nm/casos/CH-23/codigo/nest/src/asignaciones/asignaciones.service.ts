import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Comanda } from '../comandas/entities/comanda.entity';
import { Cocinero } from '../cocineros/entities/cocinero.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Comanda) private readonly comandas: Repository<Comanda>,
    @InjectRepository(Cocinero) private readonly cocineros: Repository<Cocinero>
  ) {}

  async asignarCocinero(comandaId: number, cocineroId: number, rol: string) {
    const comanda = await this.comandas.findOneBy({ id: comandaId });
    const cocinero = await this.cocineros.findOneBy({ id: cocineroId });
    if (!comanda || !cocinero) {
      throw new NotFoundException('No existe la comanda o el cocinero');
    }
    const asignacion = { comandaId, cocineroId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El cocinero ya está asignado a esa comanda');
      }
      throw error;
    }
  }

  listarPorComanda(comandaId: number) {
    return this.asignaciones.find({ where: { comandaId }, order: { cocineroId: 'ASC' } });
  }

  listarPorCocinero(cocineroId: number) {
    return this.asignaciones.find({ where: { cocineroId }, order: { comandaId: 'ASC' } });
  }

  async modificarRol(comandaId: number, cocineroId: number, rol: string) {
    const resultado = await this.asignaciones.update({ comandaId, cocineroId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { comandaId, cocineroId, rol };
  }

  async eliminarAsignacion(comandaId: number, cocineroId: number) {
    await this.asignaciones.delete({ comandaId, cocineroId });
  }
}

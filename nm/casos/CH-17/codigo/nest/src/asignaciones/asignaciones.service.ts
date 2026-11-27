import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Escena } from '../escenas/entities/escena.entity';
import { Actor } from '../actores/entities/actor.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Escena) private readonly escenas: Repository<Escena>,
    @InjectRepository(Actor) private readonly actores: Repository<Actor>
  ) {}

  async asignarActor(escenaId: number, actorId: number, rol: string) {
    const escena = await this.escenas.findOneBy({ id: escenaId });
    const actor = await this.actores.findOneBy({ id: actorId });
    if (!escena || !actor) {
      throw new NotFoundException('No existe la escena o el actor');
    }
    const asignacion = { escenaId, actorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El actor ya está asignado a esa escena');
      }
      throw error;
    }
  }

  listarPorEscena(escenaId: number) {
    return this.asignaciones.find({ where: { escenaId }, order: { actorId: 'ASC' } });
  }

  listarPorActor(actorId: number) {
    return this.asignaciones.find({ where: { actorId }, order: { escenaId: 'ASC' } });
  }

  async modificarRol(escenaId: number, actorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ escenaId, actorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { escenaId, actorId, rol };
  }

  async eliminarAsignacion(escenaId: number, actorId: number) {
    await this.asignaciones.delete({ escenaId, actorId });
  }
}

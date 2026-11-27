import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Actuacion } from './entities/actuacion.entity';
import { Festival } from '../festivales/entities/festival.entity';

@Injectable()
export class ActuacionesService {
  constructor(
    @InjectRepository(Actuacion) private readonly actuaciones: Repository<Actuacion>,
    @InjectRepository(Festival) private readonly festivales: Repository<Festival>
  ) {}

  crearActuacion(nombre: string, duracionMinutos: number, festivalId: number) {
    const actuacion = this.actuaciones.create({
      nombre,
      duracionMinutos,
      festival: { id: festivalId }
    });
    return this.actuaciones.save(actuacion);
  }

  listarActuaciones() {
    return this.actuaciones.find({ relations: { festival: true }, order: { id: 'ASC' } });
  }

  async eliminarActuacion(actuacionId: number) {
    await this.actuaciones.delete(actuacionId);
  }

  async modificarDuracionMinutos(actuacionId: number, duracionMinutos: number) {
    await this.actuaciones.update(actuacionId, { duracionMinutos });
    return this.actuaciones.findOneBy({ id: actuacionId });
  }

  async cambiarFestival(actuacionId: number, festivalId: number) {
    await this.actuaciones.update(actuacionId, { festival: { id: festivalId } });
    return this.actuaciones.findOneBy({ id: actuacionId });
  }

  async consultarFestival(festivalId: number, minimo: number) {
    const festival = await this.festivales.findOneBy({ id: festivalId });
    const actuaciones = await this.actuaciones.find({
      where: {
        festival: { id: festivalId },
        duracionMinutos: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { festival, actuaciones };
  }
}

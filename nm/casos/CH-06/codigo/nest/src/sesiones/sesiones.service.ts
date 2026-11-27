import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Sesion } from './entities/sesion.entity';
import { Gimnasio } from '../gimnasios/entities/gimnasio.entity';

@Injectable()
export class SesionesService {
  constructor(
    @InjectRepository(Sesion) private readonly sesiones: Repository<Sesion>,
    @InjectRepository(Gimnasio) private readonly gimnasios: Repository<Gimnasio>
  ) {}

  crearSesion(nombre: string, plazas: number, gimnasioId: number) {
    const sesion = this.sesiones.create({
      nombre,
      plazas,
      gimnasio: { id: gimnasioId }
    });
    return this.sesiones.save(sesion);
  }

  listarSesiones() {
    return this.sesiones.find({ order: { id: 'ASC' } });
  }

  async eliminarSesion(sesionId: number) {
    await this.sesiones.delete(sesionId);
  }

  async modificarPlazas(sesionId: number, plazas: number) {
    await this.sesiones.update(sesionId, { plazas });
    return this.sesiones.findOneBy({ id: sesionId });
  }

  async cambiarGimnasio(sesionId: number, gimnasioId: number) {
    await this.sesiones.update(sesionId, { gimnasio: { id: gimnasioId } });
    return this.sesiones.findOneBy({ id: sesionId });
  }

  async consultarGimnasio(gimnasioId: number, minimo: number) {
    const gimnasio = await this.gimnasios.findOneBy({ id: gimnasioId });
    const sesiones = await this.sesiones.find({
      where: {
        gimnasio: { id: gimnasioId },
        plazas: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { gimnasio, sesiones };
  }
}

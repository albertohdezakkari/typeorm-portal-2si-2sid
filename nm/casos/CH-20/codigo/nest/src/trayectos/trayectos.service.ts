import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Trayecto } from './entities/trayecto.entity';
import { Estacion } from '../estaciones/entities/estacion.entity';

@Injectable()
export class TrayectosService {
  constructor(
    @InjectRepository(Trayecto) private readonly trayectos: Repository<Trayecto>,
    @InjectRepository(Estacion) private readonly estaciones: Repository<Estacion>
  ) {}

  crearTrayecto(nombre: string, distanciaKm: number, estacionId: number) {
    const trayecto = this.trayectos.create({
      nombre,
      distanciaKm,
      estacion: { id: estacionId }
    });
    return this.trayectos.save(trayecto);
  }

  listarTrayectos() {
    return this.trayectos.find({ relations: { estacion: true }, order: { id: 'ASC' } });
  }

  async eliminarTrayecto(trayectoId: number) {
    await this.trayectos.delete(trayectoId);
  }

  async modificarDistanciaKm(trayectoId: number, distanciaKm: number) {
    await this.trayectos.update(trayectoId, { distanciaKm });
    return this.trayectos.findOneBy({ id: trayectoId });
  }

  async cambiarEstacion(trayectoId: number, estacionId: number) {
    await this.trayectos.update(trayectoId, { estacion: { id: estacionId } });
    return this.trayectos.findOneBy({ id: trayectoId });
  }

  async consultarEstacion(estacionId: number, minimo: number) {
    const estacion = await this.estaciones.findOneBy({ id: estacionId });
    const trayectos = await this.trayectos.find({
      where: {
        estacion: { id: estacionId },
        distanciaKm: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { estacion, trayectos };
  }
}

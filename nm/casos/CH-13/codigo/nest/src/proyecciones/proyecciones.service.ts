import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Proyeccion } from './entities/proyeccion.entity';
import { Cine } from '../cines/entities/cine.entity';

@Injectable()
export class ProyeccionesService {
  constructor(
    @InjectRepository(Proyeccion) private readonly proyecciones: Repository<Proyeccion>,
    @InjectRepository(Cine) private readonly cines: Repository<Cine>
  ) {}

  crearProyeccion(pelicula: string, duracionMinutos: number, cineId: number) {
    const proyeccion = this.proyecciones.create({
      pelicula,
      duracionMinutos,
      cine: { id: cineId }
    });
    return this.proyecciones.save(proyeccion);
  }

  listarProyecciones() {
    return this.proyecciones.find({ order: { id: 'ASC' } });
  }

  async eliminarProyeccion(proyeccionId: number) {
    await this.proyecciones.delete(proyeccionId);
  }

  async modificarDuracionMinutos(proyeccionId: number, duracionMinutos: number) {
    await this.proyecciones.update(proyeccionId, { duracionMinutos });
    return this.proyecciones.findOneBy({ id: proyeccionId });
  }

  async cambiarCine(proyeccionId: number, cineId: number) {
    await this.proyecciones.update(proyeccionId, { cine: { id: cineId } });
    return this.proyecciones.findOneBy({ id: proyeccionId });
  }

  async consultarCine(cineId: number, minimo: number) {
    const cine = await this.cines.findOneBy({ id: cineId });
    const proyecciones = await this.proyecciones.find({
      where: {
        cine: { id: cineId },
        duracionMinutos: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { cine, proyecciones };
  }
}

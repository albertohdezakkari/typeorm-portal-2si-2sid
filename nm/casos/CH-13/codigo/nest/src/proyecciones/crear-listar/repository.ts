import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyeccion } from '../entities/proyeccion.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Proyeccion) private readonly proyecciones: Repository<Proyeccion>
  ) {}

  crearProyeccionRepository(pelicula: string, duracionMinutos: number, cineId: number) {
    const proyeccion = this.proyecciones.create({
      pelicula, duracionMinutos, cine: { id: cineId }
    });
    return this.proyecciones.save(proyeccion);
  }

  listarProyeccionesRepository() {
    return this.proyecciones.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

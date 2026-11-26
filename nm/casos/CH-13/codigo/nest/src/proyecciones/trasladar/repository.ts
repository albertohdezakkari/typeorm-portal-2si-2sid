import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyeccion } from '../entities/proyeccion.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Proyeccion) private readonly proyecciones: Repository<Proyeccion>
  ) {}

  async trasladarProyeccionRepository(proyeccionId: number, cineId: number) {
    await this.proyecciones.update(proyeccionId, { cine: { id: cineId } });
    return this.proyecciones.createQueryBuilder('p')
      .where('p.id = :proyeccionId', { proyeccionId }).getOne();
  }
}

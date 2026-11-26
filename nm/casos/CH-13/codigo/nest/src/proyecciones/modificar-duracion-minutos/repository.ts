import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyeccion } from '../entities/proyeccion.entity';

@Injectable()
export class ModificarDuracionMinutosRepository {
  constructor(
    @InjectRepository(Proyeccion) private readonly proyecciones: Repository<Proyeccion>
  ) {}

  async modificarDuracionMinutosRepository(proyeccionId: number, duracionMinutos: number) {
    await this.proyecciones.update(proyeccionId, { duracionMinutos });
    return this.proyecciones.createQueryBuilder('p')
      .where('p.id = :proyeccionId', { proyeccionId }).getOne();
  }
}

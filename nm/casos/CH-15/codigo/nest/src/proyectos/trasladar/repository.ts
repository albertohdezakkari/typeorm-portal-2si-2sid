import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../entities/proyecto.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Proyecto) private readonly proyectos: Repository<Proyecto>
  ) {}

  async trasladarProyectoRepository(proyectoId: number, empresaId: number) {
    await this.proyectos.update(proyectoId, { empresa: { id: empresaId } });
    return this.proyectos.createQueryBuilder('p')
      .where('p.id = :proyectoId', { proyectoId }).getOne();
  }
}

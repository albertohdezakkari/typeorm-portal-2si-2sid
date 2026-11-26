import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../entities/proyecto.entity';

@Injectable()
export class ModificarHorasEstimadasRepository {
  constructor(
    @InjectRepository(Proyecto) private readonly proyectos: Repository<Proyecto>
  ) {}

  async modificarHorasEstimadasRepository(proyectoId: number, horasEstimadas: number) {
    await this.proyectos.update(proyectoId, { horasEstimadas });
    return this.proyectos.createQueryBuilder('p')
      .where('p.id = :proyectoId', { proyectoId }).getOne();
  }
}

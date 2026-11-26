import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sesion } from '../entities/sesion.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Sesion) private readonly sesiones: Repository<Sesion>
  ) {}

  async trasladarSesionRepository(sesionId: number, gimnasioId: number) {
    await this.sesiones.update(sesionId, { gimnasio: { id: gimnasioId } });
    return this.sesiones.createQueryBuilder('p')
      .where('p.id = :sesionId', { sesionId }).getOne();
  }
}

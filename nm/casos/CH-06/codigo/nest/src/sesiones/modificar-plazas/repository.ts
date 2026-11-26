import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sesion } from '../entities/sesion.entity';

@Injectable()
export class ModificarPlazasRepository {
  constructor(
    @InjectRepository(Sesion) private readonly sesiones: Repository<Sesion>
  ) {}

  async modificarPlazasRepository(sesionId: number, plazas: number) {
    await this.sesiones.update(sesionId, { plazas });
    return this.sesiones.createQueryBuilder('p')
      .where('p.id = :sesionId', { sesionId }).getOne();
  }
}

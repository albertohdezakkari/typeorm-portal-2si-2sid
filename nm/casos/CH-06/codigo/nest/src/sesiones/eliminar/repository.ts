import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sesion } from '../entities/sesion.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Sesion) private readonly sesiones: Repository<Sesion>
  ) {}

  async eliminarSesionRepository(sesionId: number) {
    await this.sesiones.delete(sesionId);
  }
}

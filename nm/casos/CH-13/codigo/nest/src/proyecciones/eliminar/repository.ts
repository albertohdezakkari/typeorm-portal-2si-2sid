import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyeccion } from '../entities/proyeccion.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Proyeccion) private readonly proyecciones: Repository<Proyeccion>
  ) {}

  async eliminarProyeccionRepository(proyeccionId: number) {
    await this.proyecciones.delete(proyeccionId);
  }
}

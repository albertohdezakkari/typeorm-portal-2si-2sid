import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../entities/proyecto.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Proyecto) private readonly proyectos: Repository<Proyecto>
  ) {}

  async eliminarProyectoRepository(proyectoId: number) {
    await this.proyectos.delete(proyectoId);
  }
}

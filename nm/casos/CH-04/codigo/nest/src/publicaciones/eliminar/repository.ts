import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacion } from '../entities/publicacion.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Publicacion) private readonly publicaciones: Repository<Publicacion>
  ) {}

  async eliminarPublicacionRepository(publicacionId: number) {
    await this.publicaciones.delete(publicacionId);
  }
}

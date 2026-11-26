import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Articulo } from '../entities/articulo.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Articulo) private readonly articulos: Repository<Articulo>
  ) {}

  async eliminarArticuloRepository(articuloId: number) {
    await this.articulos.delete(articuloId);
  }
}

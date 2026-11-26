import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacion } from '../entities/publicacion.entity';

@Injectable()
export class ModificarPaginasRepository {
  constructor(
    @InjectRepository(Publicacion) private readonly publicaciones: Repository<Publicacion>
  ) {}

  async modificarPaginasRepository(publicacionId: number, paginas: number) {
    await this.publicaciones.update(publicacionId, { paginas });
    return this.publicaciones.createQueryBuilder('p')
      .where('p.id = :publicacionId', { publicacionId }).getOne();
  }
}

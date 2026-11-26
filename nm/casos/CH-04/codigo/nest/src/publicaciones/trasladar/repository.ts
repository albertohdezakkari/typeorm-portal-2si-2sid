import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacion } from '../entities/publicacion.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Publicacion) private readonly publicaciones: Repository<Publicacion>
  ) {}

  async trasladarPublicacionRepository(publicacionId: number, editorialId: number) {
    await this.publicaciones.update(publicacionId, { editorial: { id: editorialId } });
    return this.publicaciones.createQueryBuilder('p')
      .where('p.id = :publicacionId', { publicacionId }).getOne();
  }
}

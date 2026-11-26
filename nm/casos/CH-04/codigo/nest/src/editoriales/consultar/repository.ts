import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacion } from '../../publicaciones/entities/publicacion.entity';
import { Editorial } from '../entities/editorial.entity';

@Injectable()
export class ConsultarEditorialRepository {
  constructor(
    @InjectRepository(Publicacion) private readonly publicaciones: Repository<Publicacion>,
    @InjectRepository(Editorial) private readonly editoriales: Repository<Editorial>
  ) {}

  async consultarEditorialRepository(editorialId: number, minimo: number) {
    const editorial = await this.editoriales.createQueryBuilder('h')
      .where('h.id = :editorialId', { editorialId }).getOne();
    const publicaciones = await this.publicaciones.createQueryBuilder('p')
      .innerJoin('p.editorial', 'h')
      .where('h.id = :editorialId', { editorialId })
      .andWhere('p.paginas >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { editorial, publicaciones };
  }
}

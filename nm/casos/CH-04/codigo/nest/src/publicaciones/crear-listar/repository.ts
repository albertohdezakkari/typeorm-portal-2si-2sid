import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacion } from '../entities/publicacion.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Publicacion) private readonly publicaciones: Repository<Publicacion>
  ) {}

  crearPublicacionRepository(nombre: string, paginas: number, editorialId: number) {
    const publicacion = this.publicaciones.create({
      nombre, paginas, editorial: { id: editorialId }
    });
    return this.publicaciones.save(publicacion);
  }

  listarPublicacionesRepository() {
    return this.publicaciones.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

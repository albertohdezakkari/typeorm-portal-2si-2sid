import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { Editorial } from '../editoriales/entities/editorial.entity';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectRepository(Publicacion) private readonly publicaciones: Repository<Publicacion>,
    @InjectRepository(Editorial) private readonly editoriales: Repository<Editorial>
  ) {}

  crearPublicacion(nombre: string, paginas: number, editorialId: number) {
    const publicacion = this.publicaciones.create({
      nombre,
      paginas,
      editorial: { id: editorialId }
    });
    return this.publicaciones.save(publicacion);
  }

  listarPublicaciones() {
    return this.publicaciones.find({ order: { id: 'ASC' } });
  }

  async eliminarPublicacion(publicacionId: number) {
    await this.publicaciones.delete(publicacionId);
  }

  async modificarPaginas(publicacionId: number, paginas: number) {
    await this.publicaciones.update(publicacionId, { paginas });
    return this.publicaciones.findOneBy({ id: publicacionId });
  }

  async cambiarEditorial(publicacionId: number, editorialId: number) {
    await this.publicaciones.update(publicacionId, { editorial: { id: editorialId } });
    return this.publicaciones.findOneBy({ id: publicacionId });
  }

  async consultarEditorial(editorialId: number, minimo: number) {
    const editorial = await this.editoriales.findOneBy({ id: editorialId });
    const publicaciones = await this.publicaciones.find({
      where: {
        editorial: { id: editorialId },
        paginas: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { editorial, publicaciones };
  }
}

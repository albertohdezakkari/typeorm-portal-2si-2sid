import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Publicacion } from '../publicaciones/entities/publicacion.entity';
import { Autor } from '../autores/entities/autor.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Publicacion) private readonly publicaciones: Repository<Publicacion>,
    @InjectRepository(Autor) private readonly autores: Repository<Autor>
  ) {}

  async asignarAutor(publicacionId: number, autorId: number, rol: string) {
    const publicacion = await this.publicaciones.findOneBy({ id: publicacionId });
    const autor = await this.autores.findOneBy({ id: autorId });
    if (!publicacion || !autor) {
      throw new NotFoundException('No existe la publicacion o el autor');
    }
    const asignacion = { publicacionId, autorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El autor ya está asignado a esa publicacion');
      }
      throw error;
    }
  }

  listarPorPublicacion(publicacionId: number) {
    return this.asignaciones.find({ where: { publicacionId }, order: { autorId: 'ASC' } });
  }

  listarPorAutor(autorId: number) {
    return this.asignaciones.find({ where: { autorId }, order: { publicacionId: 'ASC' } });
  }

  async modificarRol(publicacionId: number, autorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ publicacionId, autorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { publicacionId, autorId, rol };
  }

  async eliminarAsignacion(publicacionId: number, autorId: number) {
    await this.asignaciones.delete({ publicacionId, autorId });
  }
}

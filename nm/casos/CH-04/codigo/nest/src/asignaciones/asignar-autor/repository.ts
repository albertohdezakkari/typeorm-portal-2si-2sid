import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Publicacion } from '../../publicaciones/entities/publicacion.entity';
import { Autor } from '../../autores/entities/autor.entity';

@Injectable()
export class AsignarAutorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Publicacion) private readonly publicaciones: Repository<Publicacion>,
    @InjectRepository(Autor) private readonly autores: Repository<Autor>
  ) {}

  buscarPublicacionRepository(publicacionId: number) {
    return this.publicaciones.findOneBy({ id: publicacionId });
  }

  buscarAutorRepository(autorId: number) {
    return this.autores.findOneBy({ id: autorId });
  }

  async asignarAutorRepository(publicacionId: number, autorId: number, rol: string) {
    const asignacion = { publicacionId, autorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

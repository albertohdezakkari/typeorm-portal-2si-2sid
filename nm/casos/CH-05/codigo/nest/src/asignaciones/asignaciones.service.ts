import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Actuacion } from '../actuaciones/entities/actuacion.entity';
import { Artista } from '../artistas/entities/artista.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Actuacion) private readonly actuaciones: Repository<Actuacion>,
    @InjectRepository(Artista) private readonly artistas: Repository<Artista>
  ) {}

  crearArtista(nombre: string, apellidos: string, email: string) {
    const artista = this.artistas.create({ nombre, apellidos, email });
    return this.artistas.save(artista);
  }

  listarArtistas() {
    return this.artistas.find({ order: { id: 'ASC' } });
  }

  async asignarArtista(actuacionId: number, artistaId: number, rol: string) {
    const actuacion = await this.actuaciones.findOneBy({ id: actuacionId });
    const artista = await this.artistas.findOneBy({ id: artistaId });
    if (!actuacion || !artista) {
      throw new NotFoundException('No existe la actuacion o el artista');
    }
    const asignacion = { actuacionId, artistaId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El artista ya está asignado a esa actuacion');
      }
      throw error;
    }
  }

  listarPorActuacion(actuacionId: number) {
    return this.asignaciones.find({ where: { actuacionId }, order: { artistaId: 'ASC' } });
  }

  listarPorArtista(artistaId: number) {
    return this.asignaciones.find({ where: { artistaId }, order: { actuacionId: 'ASC' } });
  }

  async modificarRol(actuacionId: number, artistaId: number, rol: string) {
    const resultado = await this.asignaciones.update({ actuacionId, artistaId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { actuacionId, artistaId, rol };
  }

  async eliminarAsignacion(actuacionId: number, artistaId: number) {
    await this.asignaciones.delete({ actuacionId, artistaId });
  }
}

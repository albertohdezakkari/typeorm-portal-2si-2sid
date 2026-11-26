import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Actuacion } from '../../actuaciones/entities/actuacion.entity';
import { Artista } from '../../artistas/entities/artista.entity';

@Injectable()
export class AsignarArtistaRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Actuacion) private readonly actuaciones: Repository<Actuacion>,
    @InjectRepository(Artista) private readonly artistas: Repository<Artista>
  ) {}

  buscarActuacionRepository(actuacionId: number) {
    return this.actuaciones.findOneBy({ id: actuacionId });
  }

  buscarArtistaRepository(artistaId: number) {
    return this.artistas.findOneBy({ id: artistaId });
  }

  async asignarArtistaRepository(actuacionId: number, artistaId: number, rol: string) {
    const asignacion = { actuacionId, artistaId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

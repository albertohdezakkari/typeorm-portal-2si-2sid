import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Zona } from '../../zonas/entities/zona.entity';
import { Jardinero } from '../../jardineros/entities/jardinero.entity';

@Injectable()
export class AsignarJardineroRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Zona) private readonly zonas: Repository<Zona>,
    @InjectRepository(Jardinero) private readonly jardineros: Repository<Jardinero>
  ) {}

  buscarZonaRepository(zonaId: number) {
    return this.zonas.findOneBy({ id: zonaId });
  }

  buscarJardineroRepository(jardineroId: number) {
    return this.jardineros.findOneBy({ id: jardineroId });
  }

  async asignarJardineroRepository(zonaId: number, jardineroId: number, rol: string) {
    const asignacion = { zonaId, jardineroId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

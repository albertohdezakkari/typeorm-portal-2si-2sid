import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Zona } from '../zonas/entities/zona.entity';
import { Jardinero } from '../jardineros/entities/jardinero.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Zona) private readonly zonas: Repository<Zona>,
    @InjectRepository(Jardinero) private readonly jardineros: Repository<Jardinero>
  ) {}

  crearJardinero(nombre: string, apellidos: string, email: string) {
    const jardinero = this.jardineros.create({ nombre, apellidos, email });
    return this.jardineros.save(jardinero);
  }

  listarJardineros() {
    return this.jardineros.find({ order: { id: 'ASC' } });
  }

  async asignarJardinero(zonaId: number, jardineroId: number, rol: string) {
    const zona = await this.zonas.findOneBy({ id: zonaId });
    const jardinero = await this.jardineros.findOneBy({ id: jardineroId });
    if (!zona || !jardinero) {
      throw new NotFoundException('No existe la zona o el jardinero');
    }
    const asignacion = { zonaId, jardineroId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El jardinero ya está asignado a esa zona');
      }
      throw error;
    }
  }

  listarPorZona(zonaId: number) {
    return this.asignaciones.find({ where: { zonaId }, order: { jardineroId: 'ASC' } });
  }

  listarPorJardinero(jardineroId: number) {
    return this.asignaciones.find({ where: { jardineroId }, order: { zonaId: 'ASC' } });
  }

  async modificarRol(zonaId: number, jardineroId: number, rol: string) {
    const resultado = await this.asignaciones.update({ zonaId, jardineroId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { zonaId, jardineroId, rol };
  }

  async eliminarAsignacion(zonaId: number, jardineroId: number) {
    await this.asignaciones.delete({ zonaId, jardineroId });
  }
}

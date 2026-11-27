import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Planta } from '../plantas/entities/planta.entity';
import { Jardinero } from '../jardineros/entities/jardinero.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Planta) private readonly plantas: Repository<Planta>,
    @InjectRepository(Jardinero) private readonly jardineros: Repository<Jardinero>
  ) {}

  crearJardinero(nombre: string, apellidos: string, email: string) {
    const jardinero = this.jardineros.create({ nombre, apellidos, email });
    return this.jardineros.save(jardinero);
  }

  listarJardineros() {
    return this.jardineros.find({ order: { id: 'ASC' } });
  }

  async asignarJardinero(plantaId: number, jardineroId: number, rol: string) {
    const planta = await this.plantas.findOneBy({ id: plantaId });
    const jardinero = await this.jardineros.findOneBy({ id: jardineroId });
    if (!planta || !jardinero) {
      throw new NotFoundException('No existe la planta o el jardinero');
    }
    const asignacion = { plantaId, jardineroId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El jardinero ya está asignado a esa planta');
      }
      throw error;
    }
  }

  listarPorPlanta(plantaId: number) {
    return this.asignaciones.find({ where: { plantaId }, order: { jardineroId: 'ASC' } });
  }

  listarPorJardinero(jardineroId: number) {
    return this.asignaciones.find({ where: { jardineroId }, order: { plantaId: 'ASC' } });
  }

  async modificarRol(plantaId: number, jardineroId: number, rol: string) {
    const resultado = await this.asignaciones.update({ plantaId, jardineroId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { plantaId, jardineroId, rol };
  }

  async eliminarAsignacion(plantaId: number, jardineroId: number) {
    await this.asignaciones.delete({ plantaId, jardineroId });
  }
}

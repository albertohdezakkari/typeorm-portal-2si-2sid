import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Cosecha } from '../cosechas/entities/cosecha.entity';
import { Agricultor } from '../agricultores/entities/agricultor.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Cosecha) private readonly cosechas: Repository<Cosecha>,
    @InjectRepository(Agricultor) private readonly agricultores: Repository<Agricultor>
  ) {}

  crearAgricultor(nombre: string, apellidos: string, email: string) {
    const agricultor = this.agricultores.create({ nombre, apellidos, email });
    return this.agricultores.save(agricultor);
  }

  listarAgricultores() {
    return this.agricultores.find({ order: { id: 'ASC' } });
  }

  async asignarAgricultor(cosechaId: number, agricultorId: number, rol: string) {
    const cosecha = await this.cosechas.findOneBy({ id: cosechaId });
    const agricultor = await this.agricultores.findOneBy({ id: agricultorId });
    if (!cosecha || !agricultor) {
      throw new NotFoundException('No existe la cosecha o el agricultor');
    }
    const asignacion = { cosechaId, agricultorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El agricultor ya está asignado a esa cosecha');
      }
      throw error;
    }
  }

  listarPorCosecha(cosechaId: number) {
    return this.asignaciones.find({ where: { cosechaId }, order: { agricultorId: 'ASC' } });
  }

  listarPorAgricultor(agricultorId: number) {
    return this.asignaciones.find({ where: { agricultorId }, order: { cosechaId: 'ASC' } });
  }

  async modificarRol(cosechaId: number, agricultorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ cosechaId, agricultorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { cosechaId, agricultorId, rol };
  }

  async eliminarAsignacion(cosechaId: number, agricultorId: number) {
    await this.asignaciones.delete({ cosechaId, agricultorId });
  }
}

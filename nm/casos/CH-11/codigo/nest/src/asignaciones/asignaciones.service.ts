import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Reserva } from '../reservas/entities/reserva.entity';
import { Huesped } from '../huespedes/entities/huesped.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Reserva) private readonly reservas: Repository<Reserva>,
    @InjectRepository(Huesped) private readonly huespedes: Repository<Huesped>
  ) {}

  crearHuesped(nombre: string, apellidos: string, email: string) {
    const huesped = this.huespedes.create({ nombre, apellidos, email });
    return this.huespedes.save(huesped);
  }

  listarHuespedes() {
    return this.huespedes.find({ order: { id: 'ASC' } });
  }

  async asignarHuesped(reservaId: number, huespedId: number, rol: string) {
    const reserva = await this.reservas.findOneBy({ id: reservaId });
    const huesped = await this.huespedes.findOneBy({ id: huespedId });
    if (!reserva || !huesped) {
      throw new NotFoundException('No existe la reserva o el huesped');
    }
    const asignacion = { reservaId, huespedId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El huesped ya está asignado a esa reserva');
      }
      throw error;
    }
  }

  listarPorReserva(reservaId: number) {
    return this.asignaciones.find({ where: { reservaId }, order: { huespedId: 'ASC' } });
  }

  listarPorHuesped(huespedId: number) {
    return this.asignaciones.find({ where: { huespedId }, order: { reservaId: 'ASC' } });
  }

  async modificarRol(reservaId: number, huespedId: number, rol: string) {
    const resultado = await this.asignaciones.update({ reservaId, huespedId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { reservaId, huespedId, rol };
  }

  async eliminarAsignacion(reservaId: number, huespedId: number) {
    await this.asignaciones.delete({ reservaId, huespedId });
  }
}

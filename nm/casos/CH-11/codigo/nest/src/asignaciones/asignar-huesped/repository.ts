import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Reserva } from '../../reservas/entities/reserva.entity';
import { Huesped } from '../../huespedes/entities/huesped.entity';

@Injectable()
export class AsignarHuespedRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Reserva) private readonly reservas: Repository<Reserva>,
    @InjectRepository(Huesped) private readonly huespedes: Repository<Huesped>
  ) {}

  buscarReservaRepository(reservaId: number) {
    return this.reservas.findOneBy({ id: reservaId });
  }

  buscarHuespedRepository(huespedId: number) {
    return this.huespedes.findOneBy({ id: huespedId });
  }

  async asignarHuespedRepository(reservaId: number, huespedId: number, rol: string) {
    const asignacion = { reservaId, huespedId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

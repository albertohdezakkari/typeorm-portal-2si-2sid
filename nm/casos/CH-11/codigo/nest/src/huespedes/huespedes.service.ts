import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Huesped } from './entities/huesped.entity';

@Injectable()
export class HuespedesService {
  constructor(
    @InjectRepository(Huesped) private readonly huespedes: Repository<Huesped>
  ) {}

  crearHuesped(nombre: string, apellidos: string, email: string) {
    const huesped = this.huespedes.create({ nombre, apellidos, email });
    return this.huespedes.save(huesped);
  }

  listarHuespedes() {
    return this.huespedes.find({ order: { id: 'ASC' } });
  }
}

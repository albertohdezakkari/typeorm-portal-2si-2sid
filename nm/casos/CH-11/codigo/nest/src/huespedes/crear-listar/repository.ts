import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Huesped } from '../entities/huesped.entity';

@Injectable()
export class HuespedesRepository {
  constructor(
    @InjectRepository(Huesped) private readonly huespedes: Repository<Huesped>
  ) {}

  crearHuespedRepository(nombre: string, apellidos: string, email: string) {
    const huesped = this.huespedes.create({ nombre, apellidos, email });
    return this.huespedes.save(huesped);
  }

  listarHuespedesRepository() {
    return this.huespedes.find({ order: { id: 'ASC' } });
  }
}

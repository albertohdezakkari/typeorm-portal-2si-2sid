import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Huerto } from './entities/huerto.entity';

@Injectable()
export class HuertosService {
  constructor(
    @InjectRepository(Huerto) private readonly huertos: Repository<Huerto>
  ) {}

  crearHuerto(nombre: string) {
    const huerto = this.huertos.create({ nombre });
    return this.huertos.save(huerto);
  }

  listarHuertos() {
    return this.huertos.find({ order: { id: 'ASC' } });
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Puerto } from './entities/puerto.entity';

@Injectable()
export class PuertosService {
  constructor(
    @InjectRepository(Puerto) private readonly puertos: Repository<Puerto>
  ) {}

  crearPuerto(nombre: string) {
    const puerto = this.puertos.create({ nombre });
    return this.puertos.save(puerto);
  }

  listarPuertos() {
    return this.puertos.find({ order: { id: 'ASC' } });
  }
}
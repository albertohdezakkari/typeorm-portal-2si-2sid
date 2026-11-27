import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parque } from './entities/parque.entity';

@Injectable()
export class ParquesService {
  constructor(
    @InjectRepository(Parque) private readonly parques: Repository<Parque>
  ) {}

  crearParque(nombre: string) {
    const parque = this.parques.create({ nombre });
    return this.parques.save(parque);
  }

  listarParques() {
    return this.parques.find({ order: { id: 'ASC' } });
  }
}
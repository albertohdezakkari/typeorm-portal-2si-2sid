import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teatro } from './entities/teatro.entity';

@Injectable()
export class TeatrosService {
  constructor(
    @InjectRepository(Teatro) private readonly teatros: Repository<Teatro>
  ) {}

  crearTeatro(nombre: string) {
    const teatro = this.teatros.create({ nombre });
    return this.teatros.save(teatro);
  }

  listarTeatros() {
    return this.teatros.find({ order: { id: 'ASC' } });
  }
}
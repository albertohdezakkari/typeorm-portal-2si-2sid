import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cine } from './entities/cine.entity';

@Injectable()
export class CinesService {
  constructor(
    @InjectRepository(Cine) private readonly cines: Repository<Cine>
  ) {}

  crearCine(nombre: string) {
    const cine = this.cines.create({ nombre });
    return this.cines.save(cine);
  }

  listarCines() {
    return this.cines.find({ order: { id: 'ASC' } });
  }
}
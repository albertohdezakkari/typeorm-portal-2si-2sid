import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vivero } from './entities/vivero.entity';

@Injectable()
export class ViverosService {
  constructor(
    @InjectRepository(Vivero) private readonly viveros: Repository<Vivero>
  ) {}

  crearVivero(nombre: string) {
    const vivero = this.viveros.create({ nombre });
    return this.viveros.save(vivero);
  }

  listarViveros() {
    return this.viveros.find({ order: { id: 'ASC' } });
  }
}
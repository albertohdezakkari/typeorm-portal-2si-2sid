import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Museo } from './entities/museo.entity';

@Injectable()
export class MuseosService {
  constructor(
    @InjectRepository(Museo) private readonly museos: Repository<Museo>
  ) {}

  crearMuseo(nombre: string) {
    const museo = this.museos.create({ nombre });
    return this.museos.save(museo);
  }

  listarMuseos() {
    return this.museos.find({ order: { id: 'ASC' } });
  }
}
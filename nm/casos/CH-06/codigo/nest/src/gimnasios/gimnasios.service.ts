import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gimnasio } from './entities/gimnasio.entity';

@Injectable()
export class GimnasiosService {
  constructor(
    @InjectRepository(Gimnasio) private readonly gimnasios: Repository<Gimnasio>
  ) {}

  crearGimnasio(nombre: string) {
    const gimnasio = this.gimnasios.create({ nombre });
    return this.gimnasios.save(gimnasio);
  }

  listarGimnasios() {
    return this.gimnasios.find({ order: { id: 'ASC' } });
  }
}
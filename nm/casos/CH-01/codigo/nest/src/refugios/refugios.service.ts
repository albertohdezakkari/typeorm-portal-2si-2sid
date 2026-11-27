import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Refugio } from './entities/refugio.entity';

@Injectable()
export class RefugiosService {
  constructor(
    @InjectRepository(Refugio) private readonly refugios: Repository<Refugio>
  ) {}

  crearRefugio(nombre: string) {
    const refugio = this.refugios.create({ nombre });
    return this.refugios.save(refugio);
  }

  listarRefugios() {
    return this.refugios.find({ order: { id: 'ASC' } });
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Emisora } from './entities/emisora.entity';

@Injectable()
export class EmisorasService {
  constructor(
    @InjectRepository(Emisora) private readonly emisoras: Repository<Emisora>
  ) {}

  crearEmisora(nombre: string) {
    const emisora = this.emisoras.create({ nombre });
    return this.emisoras.save(emisora);
  }

  listarEmisoras() {
    return this.emisoras.find({ order: { id: 'ASC' } });
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tienda } from './entities/tienda.entity';

@Injectable()
export class TiendasService {
  constructor(
    @InjectRepository(Tienda) private readonly tiendas: Repository<Tienda>
  ) {}

  crearTienda(nombre: string) {
    const tienda = this.tiendas.create({ nombre });
    return this.tiendas.save(tienda);
  }

  listarTiendas() {
    return this.tiendas.find({ order: { id: 'ASC' } });
  }
}
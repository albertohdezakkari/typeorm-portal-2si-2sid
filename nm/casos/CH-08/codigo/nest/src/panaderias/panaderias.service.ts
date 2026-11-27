import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Panaderia } from './entities/panaderia.entity';

@Injectable()
export class PanaderiasService {
  constructor(
    @InjectRepository(Panaderia) private readonly panaderias: Repository<Panaderia>
  ) {}

  crearPanaderia(nombre: string) {
    const panaderia = this.panaderias.create({ nombre });
    return this.panaderias.save(panaderia);
  }

  listarPanaderias() {
    return this.panaderias.find({ order: { id: 'ASC' } });
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ayuntamiento } from './entities/ayuntamiento.entity';

@Injectable()
export class AyuntamientosService {
  constructor(
    @InjectRepository(Ayuntamiento) private readonly ayuntamientos: Repository<Ayuntamiento>
  ) {}

  crearAyuntamiento(nombre: string) {
    const ayuntamiento = this.ayuntamientos.create({ nombre });
    return this.ayuntamientos.save(ayuntamiento);
  }

  listarAyuntamientos() {
    return this.ayuntamientos.find({ order: { id: 'ASC' } });
  }
}
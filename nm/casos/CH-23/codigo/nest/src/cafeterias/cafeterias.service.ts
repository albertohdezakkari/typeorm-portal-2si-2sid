import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cafeteria } from './entities/cafeteria.entity';

@Injectable()
export class CafeteriasService {
  constructor(
    @InjectRepository(Cafeteria) private readonly cafeterias: Repository<Cafeteria>
  ) {}

  crearCafeteria(nombre: string) {
    const cafeteria = this.cafeterias.create({ nombre });
    return this.cafeterias.save(cafeteria);
  }

  listarCafeterias() {
    return this.cafeterias.find({ order: { id: 'ASC' } });
  }
}
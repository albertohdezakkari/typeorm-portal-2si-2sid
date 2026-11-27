import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Festival } from './entities/festival.entity';

@Injectable()
export class FestivalesService {
  constructor(
    @InjectRepository(Festival) private readonly festivales: Repository<Festival>
  ) {}

  crearFestival(nombre: string) {
    const festival = this.festivales.create({ nombre });
    return this.festivales.save(festival);
  }

  listarFestivales() {
    return this.festivales.find({ order: { id: 'ASC' } });
  }
}
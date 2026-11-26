import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from '../../animales/entities/animal.entity';
import { Refugio } from '../entities/refugio.entity';

@Injectable()
export class ConsultarRefugioRepository {
  constructor(
    @InjectRepository(Animal) private readonly animales: Repository<Animal>,
    @InjectRepository(Refugio) private readonly refugios: Repository<Refugio>
  ) {}

  async consultarRefugioRepository(refugioId: number, minimo: number) {
    const refugio = await this.refugios.createQueryBuilder('h')
      .where('h.id = :refugioId', { refugioId }).getOne();
    const animales = await this.animales.createQueryBuilder('p')
      .innerJoin('p.refugio', 'h')
      .where('h.id = :refugioId', { refugioId })
      .andWhere('p.edadMeses >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { refugio, animales };
  }
}

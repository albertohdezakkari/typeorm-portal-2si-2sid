import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from '../entities/animal.entity';

@Injectable()
export class ModificarEdadMesesRepository {
  constructor(
    @InjectRepository(Animal) private readonly animales: Repository<Animal>
  ) {}

  async modificarEdadMesesRepository(animalId: number, edadMeses: number) {
    await this.animales.update(animalId, { edadMeses });
    return this.animales.createQueryBuilder('p')
      .where('p.id = :animalId', { animalId }).getOne();
  }
}

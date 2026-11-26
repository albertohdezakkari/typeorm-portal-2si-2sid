import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from '../entities/animal.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Animal) private readonly animales: Repository<Animal>
  ) {}

  async trasladarAnimalRepository(animalId: number, refugioId: number) {
    await this.animales.update(animalId, { refugio: { id: refugioId } });
    return this.animales.createQueryBuilder('p')
      .where('p.id = :animalId', { animalId }).getOne();
  }
}

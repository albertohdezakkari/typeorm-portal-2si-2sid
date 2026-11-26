import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from '../entities/animal.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Animal) private readonly animales: Repository<Animal>
  ) {}

  async eliminarAnimalRepository(animalId: number) {
    await this.animales.delete(animalId);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from '../entities/animal.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Animal) private readonly animales: Repository<Animal>
  ) {}

  crearAnimalRepository(nombre: string, edadMeses: number, refugioId: number) {
    const animal = this.animales.create({
      nombre, edadMeses, refugio: { id: refugioId }
    });
    return this.animales.save(animal);
  }

  listarAnimalesRepository() {
    return this.animales.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

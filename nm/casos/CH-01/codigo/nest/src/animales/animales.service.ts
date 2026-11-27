import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { Refugio } from '../refugios/entities/refugio.entity';

@Injectable()
export class AnimalesService {
  constructor(
    @InjectRepository(Animal) private readonly animales: Repository<Animal>,
    @InjectRepository(Refugio) private readonly refugios: Repository<Refugio>
  ) {}

  crearAnimal(nombre: string, edadMeses: number, refugioId: number) {
    const animal = this.animales.create({
      nombre,
      edadMeses,
      refugio: { id: refugioId }
    });
    return this.animales.save(animal);
  }

  listarAnimales() {
    return this.animales.find({ order: { id: 'ASC' } });
  }

  async eliminarAnimal(animalId: number) {
    await this.animales.delete(animalId);
  }

  async modificarEdadMeses(animalId: number, edadMeses: number) {
    await this.animales.update(animalId, { edadMeses });
    return this.animales.findOneBy({ id: animalId });
  }

  async cambiarRefugio(animalId: number, refugioId: number) {
    await this.animales.update(animalId, { refugio: { id: refugioId } });
    return this.animales.findOneBy({ id: animalId });
  }

  async consultarRefugio(refugioId: number, minimo: number) {
    const refugio = await this.refugios.findOneBy({ id: refugioId });
    const animales = await this.animales.find({
      where: {
        refugio: { id: refugioId },
        edadMeses: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { refugio, animales };
  }
}

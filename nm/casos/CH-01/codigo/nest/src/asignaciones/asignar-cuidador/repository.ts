import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Animal } from '../../animales/entities/animal.entity';
import { Cuidador } from '../../cuidadores/entities/cuidador.entity';

@Injectable()
export class AsignarCuidadorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Animal) private readonly animales: Repository<Animal>,
    @InjectRepository(Cuidador) private readonly cuidadores: Repository<Cuidador>
  ) {}

  buscarAnimalRepository(animalId: number) {
    return this.animales.findOneBy({ id: animalId });
  }

  buscarCuidadorRepository(cuidadorId: number) {
    return this.cuidadores.findOneBy({ id: cuidadorId });
  }

  async asignarCuidadorRepository(animalId: number, cuidadorId: number, rol: string) {
    const asignacion = { animalId, cuidadorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

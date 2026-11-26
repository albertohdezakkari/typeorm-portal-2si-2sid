import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planta } from '../entities/planta.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Planta) private readonly plantas: Repository<Planta>
  ) {}

  crearPlantaRepository(nombre: string, alturaCm: number, viveroId: number) {
    const planta = this.plantas.create({
      nombre, alturaCm, vivero: { id: viveroId }
    });
    return this.plantas.save(planta);
  }

  listarPlantasRepository() {
    return this.plantas.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

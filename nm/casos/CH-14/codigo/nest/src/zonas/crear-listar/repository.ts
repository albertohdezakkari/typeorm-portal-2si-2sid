import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zona } from '../entities/zona.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Zona) private readonly zonas: Repository<Zona>
  ) {}

  crearZonaRepository(nombre: string, capacidad: number, parqueId: number) {
    const zona = this.zonas.create({
      nombre, capacidad, parque: { id: parqueId }
    });
    return this.zonas.save(zona);
  }

  listarZonasRepository() {
    return this.zonas.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

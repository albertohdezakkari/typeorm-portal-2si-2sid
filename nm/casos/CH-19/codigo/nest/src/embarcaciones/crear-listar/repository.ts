import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Embarcacion } from '../entities/embarcacion.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Embarcacion) private readonly embarcaciones: Repository<Embarcacion>
  ) {}

  crearEmbarcacionRepository(nombre: string, esloraMetros: number, puertoId: number) {
    const embarcacion = this.embarcaciones.create({
      nombre, esloraMetros, puerto: { id: puertoId }
    });
    return this.embarcaciones.save(embarcacion);
  }

  listarEmbarcacionesRepository() {
    return this.embarcaciones.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cosecha } from '../entities/cosecha.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Cosecha) private readonly cosechas: Repository<Cosecha>
  ) {}

  crearCosechaRepository(nombre: string, kilos: number, granjaId: number) {
    const cosecha = this.cosechas.create({
      nombre, kilos, granja: { id: granjaId }
    });
    return this.cosechas.save(cosecha);
  }

  listarCosechasRepository() {
    return this.cosechas.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

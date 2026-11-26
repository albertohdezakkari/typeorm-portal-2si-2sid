import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comanda } from '../entities/comanda.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Comanda) private readonly comandas: Repository<Comanda>
  ) {}

  crearComandaRepository(nombre: string, importeCentimos: number, cafeteriaId: number) {
    const comanda = this.comandas.create({
      nombre, importeCentimos, cafeteria: { id: cafeteriaId }
    });
    return this.comandas.save(comanda);
  }

  listarComandasRepository() {
    return this.comandas.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

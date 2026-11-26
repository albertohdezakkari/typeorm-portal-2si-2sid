import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from '../entities/lote.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Lote) private readonly lotes: Repository<Lote>
  ) {}

  crearLoteRepository(nombre: string, kilos: number, cooperativaId: number) {
    const lote = this.lotes.create({
      nombre, kilos, cooperativa: { id: cooperativaId }
    });
    return this.lotes.save(lote);
  }

  listarLotesRepository() {
    return this.lotes.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

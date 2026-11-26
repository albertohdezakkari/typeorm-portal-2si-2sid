import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcela } from '../entities/parcela.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Parcela) private readonly parcelas: Repository<Parcela>
  ) {}

  crearParcelaRepository(nombre: string, superficieM2: number, huertoId: number) {
    const parcela = this.parcelas.create({
      nombre, superficieM2, huerto: { id: huertoId }
    });
    return this.parcelas.save(parcela);
  }

  listarParcelasRepository() {
    return this.parcelas.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

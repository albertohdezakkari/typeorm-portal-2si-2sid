import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pieza } from '../entities/pieza.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Pieza) private readonly piezas: Repository<Pieza>
  ) {}

  crearPiezaRepository(nombre: string, antiguedadAnios: number, museoId: number) {
    const pieza = this.piezas.create({
      nombre, antiguedadAnios, museo: { id: museoId }
    });
    return this.piezas.save(pieza);
  }

  listarPiezasRepository() {
    return this.piezas.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

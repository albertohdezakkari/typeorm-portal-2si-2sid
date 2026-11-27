import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cooperativa } from './entities/cooperativa.entity';

@Injectable()
export class CooperativasService {
  constructor(
    @InjectRepository(Cooperativa) private readonly cooperativas: Repository<Cooperativa>
  ) {}

  crearCooperativa(nombre: string) {
    const cooperativa = this.cooperativas.create({ nombre });
    return this.cooperativas.save(cooperativa);
  }

  listarCooperativas() {
    return this.cooperativas.find({ order: { id: 'ASC' } });
  }
}
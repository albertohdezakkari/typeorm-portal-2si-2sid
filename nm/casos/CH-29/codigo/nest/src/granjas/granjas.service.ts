import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Granja } from './entities/granja.entity';

@Injectable()
export class GranjasService {
  constructor(
    @InjectRepository(Granja) private readonly granjas: Repository<Granja>
  ) {}

  crearGranja(nombre: string) {
    const granja = this.granjas.create({ nombre });
    return this.granjas.save(granja);
  }

  listarGranjas() {
    return this.granjas.find({ order: { id: 'ASC' } });
  }
}
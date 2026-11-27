import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guia } from './entities/guia.entity';

@Injectable()
export class GuiasService {
  constructor(
    @InjectRepository(Guia) private readonly guias: Repository<Guia>
  ) {}

  crearGuia(nombre: string, apellidos: string, email: string) {
    const guia = this.guias.create({ nombre, apellidos, email });
    return this.guias.save(guia);
  }

  listarGuias() {
    return this.guias.find({ order: { id: 'ASC' } });
  }
}

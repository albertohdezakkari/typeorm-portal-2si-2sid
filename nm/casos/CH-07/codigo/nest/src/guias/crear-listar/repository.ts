import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guia } from '../entities/guia.entity';

@Injectable()
export class GuiasRepository {
  constructor(
    @InjectRepository(Guia) private readonly guias: Repository<Guia>
  ) {}

  crearGuiaRepository(nombre: string, apellidos: string, email: string) {
    const guia = this.guias.create({ nombre, apellidos, email });
    return this.guias.save(guia);
  }

  listarGuiasRepository() {
    return this.guias.find({ order: { id: 'ASC' } });
  }
}

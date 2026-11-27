import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Pieza } from './entities/pieza.entity';
import { Museo } from '../museos/entities/museo.entity';

@Injectable()
export class PiezasService {
  constructor(
    @InjectRepository(Pieza) private readonly piezas: Repository<Pieza>,
    @InjectRepository(Museo) private readonly museos: Repository<Museo>
  ) {}

  crearPieza(nombre: string, antiguedadAnios: number, museoId: number) {
    const pieza = this.piezas.create({
      nombre,
      antiguedadAnios,
      museo: { id: museoId }
    });
    return this.piezas.save(pieza);
  }

  listarPiezas() {
    return this.piezas.find({ relations: { museo: true }, order: { id: 'ASC' } });
  }

  async eliminarPieza(piezaId: number) {
    await this.piezas.delete(piezaId);
  }

  async modificarAntiguedadAnios(piezaId: number, antiguedadAnios: number) {
    await this.piezas.update(piezaId, { antiguedadAnios });
    return this.piezas.findOneBy({ id: piezaId });
  }

  async cambiarMuseo(piezaId: number, museoId: number) {
    await this.piezas.update(piezaId, { museo: { id: museoId } });
    return this.piezas.findOneBy({ id: piezaId });
  }

  async consultarMuseo(museoId: number, minimo: number) {
    const museo = await this.museos.findOneBy({ id: museoId });
    const piezas = await this.piezas.find({
      where: {
        museo: { id: museoId },
        antiguedadAnios: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { museo, piezas };
  }
}

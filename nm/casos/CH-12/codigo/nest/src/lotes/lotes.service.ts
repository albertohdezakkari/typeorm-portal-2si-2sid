import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Lote } from './entities/lote.entity';
import { Cooperativa } from '../cooperativas/entities/cooperativa.entity';

@Injectable()
export class LotesService {
  constructor(
    @InjectRepository(Lote) private readonly lotes: Repository<Lote>,
    @InjectRepository(Cooperativa) private readonly cooperativas: Repository<Cooperativa>
  ) {}

  crearLote(nombre: string, kilos: number, cooperativaId: number) {
    const lote = this.lotes.create({
      nombre,
      kilos,
      cooperativa: { id: cooperativaId }
    });
    return this.lotes.save(lote);
  }

  listarLotes() {
    return this.lotes.find({ relations: { cooperativa: true }, order: { id: 'ASC' } });
  }

  async eliminarLote(loteId: number) {
    await this.lotes.delete(loteId);
  }

  async modificarKilos(loteId: number, kilos: number) {
    await this.lotes.update(loteId, { kilos });
    return this.lotes.findOneBy({ id: loteId });
  }

  async cambiarCooperativa(loteId: number, cooperativaId: number) {
    await this.lotes.update(loteId, { cooperativa: { id: cooperativaId } });
    return this.lotes.findOneBy({ id: loteId });
  }

  async consultarCooperativa(cooperativaId: number, minimo: number) {
    const cooperativa = await this.cooperativas.findOneBy({ id: cooperativaId });
    const lotes = await this.lotes.find({
      where: {
        cooperativa: { id: cooperativaId },
        kilos: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { cooperativa, lotes };
  }
}

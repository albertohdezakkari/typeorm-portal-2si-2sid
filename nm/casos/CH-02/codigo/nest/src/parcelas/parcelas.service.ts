import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Parcela } from './entities/parcela.entity';
import { Huerto } from '../huertos/entities/huerto.entity';

@Injectable()
export class ParcelasService {
  constructor(
    @InjectRepository(Parcela) private readonly parcelas: Repository<Parcela>,
    @InjectRepository(Huerto) private readonly huertos: Repository<Huerto>
  ) {}

  crearParcela(nombre: string, superficieM2: number, huertoId: number) {
    const parcela = this.parcelas.create({
      nombre,
      superficieM2,
      huerto: { id: huertoId }
    });
    return this.parcelas.save(parcela);
  }

  listarParcelas() {
    return this.parcelas.find({ order: { id: 'ASC' } });
  }

  async eliminarParcela(parcelaId: number) {
    await this.parcelas.delete(parcelaId);
  }

  async modificarSuperficieM2(parcelaId: number, superficieM2: number) {
    await this.parcelas.update(parcelaId, { superficieM2 });
    return this.parcelas.findOneBy({ id: parcelaId });
  }

  async cambiarHuerto(parcelaId: number, huertoId: number) {
    await this.parcelas.update(parcelaId, { huerto: { id: huertoId } });
    return this.parcelas.findOneBy({ id: parcelaId });
  }

  async consultarHuerto(huertoId: number, minimo: number) {
    const huerto = await this.huertos.findOneBy({ id: huertoId });
    const parcelas = await this.parcelas.find({
      where: {
        huerto: { id: huertoId },
        superficieM2: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { huerto, parcelas };
  }
}

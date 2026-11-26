import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Parcela } from '../../parcelas/entities/parcela.entity';
import { Cultivador } from '../../cultivadores/entities/cultivador.entity';

@Injectable()
export class AsignarCultivadorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Parcela) private readonly parcelas: Repository<Parcela>,
    @InjectRepository(Cultivador) private readonly cultivadores: Repository<Cultivador>
  ) {}

  buscarParcelaRepository(parcelaId: number) {
    return this.parcelas.findOneBy({ id: parcelaId });
  }

  buscarCultivadorRepository(cultivadorId: number) {
    return this.cultivadores.findOneBy({ id: cultivadorId });
  }

  async asignarCultivadorRepository(parcelaId: number, cultivadorId: number, rol: string) {
    const asignacion = { parcelaId, cultivadorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

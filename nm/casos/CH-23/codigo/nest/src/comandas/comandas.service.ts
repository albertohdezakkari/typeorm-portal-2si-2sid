import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Comanda } from './entities/comanda.entity';
import { Cafeteria } from '../cafeterias/entities/cafeteria.entity';

@Injectable()
export class ComandasService {
  constructor(
    @InjectRepository(Comanda) private readonly comandas: Repository<Comanda>,
    @InjectRepository(Cafeteria) private readonly cafeterias: Repository<Cafeteria>
  ) {}

  crearComanda(nombre: string, importeCentimos: number, cafeteriaId: number) {
    const comanda = this.comandas.create({
      nombre,
      importeCentimos,
      cafeteria: { id: cafeteriaId }
    });
    return this.comandas.save(comanda);
  }

  listarComandas() {
    return this.comandas.find({ relations: { cafeteria: true }, order: { id: 'ASC' } });
  }

  async eliminarComanda(comandaId: number) {
    await this.comandas.delete(comandaId);
  }

  async modificarImporteCentimos(comandaId: number, importeCentimos: number) {
    await this.comandas.update(comandaId, { importeCentimos });
    return this.comandas.findOneBy({ id: comandaId });
  }

  async cambiarCafeteria(comandaId: number, cafeteriaId: number) {
    await this.comandas.update(comandaId, { cafeteria: { id: cafeteriaId } });
    return this.comandas.findOneBy({ id: comandaId });
  }

  async consultarCafeteria(cafeteriaId: number, minimo: number) {
    const cafeteria = await this.cafeterias.findOneBy({ id: cafeteriaId });
    const comandas = await this.comandas.find({
      where: {
        cafeteria: { id: cafeteriaId },
        importeCentimos: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { cafeteria, comandas };
  }
}

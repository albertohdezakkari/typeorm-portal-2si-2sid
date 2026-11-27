import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Muestra } from './entities/muestra.entity';
import { Laboratorio } from '../laboratorios/entities/laboratorio.entity';

@Injectable()
export class MuestrasService {
  constructor(
    @InjectRepository(Muestra) private readonly muestras: Repository<Muestra>,
    @InjectRepository(Laboratorio) private readonly laboratorios: Repository<Laboratorio>
  ) {}

  crearMuestra(nombre: string, cantidadMl: number, laboratorioId: number) {
    const muestra = this.muestras.create({
      nombre,
      cantidadMl,
      laboratorio: { id: laboratorioId }
    });
    return this.muestras.save(muestra);
  }

  listarMuestras() {
    return this.muestras.find({ order: { id: 'ASC' } });
  }

  async eliminarMuestra(muestraId: number) {
    await this.muestras.delete(muestraId);
  }

  async modificarCantidadMl(muestraId: number, cantidadMl: number) {
    await this.muestras.update(muestraId, { cantidadMl });
    return this.muestras.findOneBy({ id: muestraId });
  }

  async cambiarLaboratorio(muestraId: number, laboratorioId: number) {
    await this.muestras.update(muestraId, { laboratorio: { id: laboratorioId } });
    return this.muestras.findOneBy({ id: muestraId });
  }

  async consultarLaboratorio(laboratorioId: number, minimo: number) {
    const laboratorio = await this.laboratorios.findOneBy({ id: laboratorioId });
    const muestras = await this.muestras.find({
      where: {
        laboratorio: { id: laboratorioId },
        cantidadMl: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { laboratorio, muestras };
  }
}

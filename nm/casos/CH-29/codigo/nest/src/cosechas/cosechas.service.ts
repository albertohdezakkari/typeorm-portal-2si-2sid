import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Cosecha } from './entities/cosecha.entity';
import { Granja } from '../granjas/entities/granja.entity';

@Injectable()
export class CosechasService {
  constructor(
    @InjectRepository(Cosecha) private readonly cosechas: Repository<Cosecha>,
    @InjectRepository(Granja) private readonly granjas: Repository<Granja>
  ) {}

  crearCosecha(nombre: string, kilos: number, granjaId: number) {
    const cosecha = this.cosechas.create({
      nombre,
      kilos,
      granja: { id: granjaId }
    });
    return this.cosechas.save(cosecha);
  }

  listarCosechas() {
    return this.cosechas.find({ order: { id: 'ASC' } });
  }

  async eliminarCosecha(cosechaId: number) {
    await this.cosechas.delete(cosechaId);
  }

  async modificarKilos(cosechaId: number, kilos: number) {
    await this.cosechas.update(cosechaId, { kilos });
    return this.cosechas.findOneBy({ id: cosechaId });
  }

  async cambiarGranja(cosechaId: number, granjaId: number) {
    await this.cosechas.update(cosechaId, { granja: { id: granjaId } });
    return this.cosechas.findOneBy({ id: cosechaId });
  }

  async consultarGranja(granjaId: number, minimo: number) {
    const granja = await this.granjas.findOneBy({ id: granjaId });
    const cosechas = await this.cosechas.find({
      where: {
        granja: { id: granjaId },
        kilos: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { granja, cosechas };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Empresa } from '../entities/empresa.entity';

@Injectable()
export class ConsultarEmpresaRepository {
  constructor(
    @InjectRepository(Proyecto) private readonly proyectos: Repository<Proyecto>,
    @InjectRepository(Empresa) private readonly empresas: Repository<Empresa>
  ) {}

  async consultarEmpresaRepository(empresaId: number, minimo: number) {
    const empresa = await this.empresas.createQueryBuilder('h')
      .where('h.id = :empresaId', { empresaId }).getOne();
    const proyectos = await this.proyectos.createQueryBuilder('p')
      .innerJoin('p.empresa', 'h')
      .where('h.id = :empresaId', { empresaId })
      .andWhere('p.horasEstimadas >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { empresa, proyectos };
  }
}

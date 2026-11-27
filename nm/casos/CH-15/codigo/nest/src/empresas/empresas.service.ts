import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa) private readonly empresas: Repository<Empresa>
  ) {}

  crearEmpresa(nombre: string) {
    const empresa = this.empresas.create({ nombre });
    return this.empresas.save(empresa);
  }

  listarEmpresas() {
    return this.empresas.find({ order: { id: 'ASC' } });
  }
}
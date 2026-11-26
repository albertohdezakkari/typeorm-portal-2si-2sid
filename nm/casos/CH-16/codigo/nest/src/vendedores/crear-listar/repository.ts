import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendedor } from '../entities/vendedor.entity';

@Injectable()
export class VendedoresRepository {
  constructor(
    @InjectRepository(Vendedor) private readonly vendedores: Repository<Vendedor>
  ) {}

  crearVendedorRepository(nombre: string, apellidos: string, email: string) {
    const vendedor = this.vendedores.create({ nombre, apellidos, email });
    return this.vendedores.save(vendedor);
  }

  listarVendedoresRepository() {
    return this.vendedores.find({ order: { id: 'ASC' } });
  }
}

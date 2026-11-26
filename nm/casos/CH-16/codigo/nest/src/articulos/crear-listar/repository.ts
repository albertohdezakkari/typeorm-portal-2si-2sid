import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Articulo } from '../entities/articulo.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Articulo) private readonly articulos: Repository<Articulo>
  ) {}

  crearArticuloRepository(nombre: string, stock: number, tiendaId: number) {
    const articulo = this.articulos.create({
      nombre, stock, tienda: { id: tiendaId }
    });
    return this.articulos.save(articulo);
  }

  listarArticulosRepository() {
    return this.articulos.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

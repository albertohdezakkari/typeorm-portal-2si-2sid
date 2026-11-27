import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelesService {
  constructor(
    @InjectRepository(Hotel) private readonly hoteles: Repository<Hotel>
  ) {}

  crearHotel(nombre: string) {
    const hotel = this.hoteles.create({ nombre });
    return this.hoteles.save(hotel);
  }

  listarHoteles() {
    return this.hoteles.find({ order: { id: 'ASC' } });
  }
}
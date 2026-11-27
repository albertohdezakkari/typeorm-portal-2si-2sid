import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './entities/club.entity';

@Injectable()
export class ClubesService {
  constructor(
    @InjectRepository(Club) private readonly clubes: Repository<Club>
  ) {}

  crearClub(nombre: string) {
    const club = this.clubes.create({ nombre });
    return this.clubes.save(club);
  }

  listarClubes() {
    return this.clubes.find({ order: { id: 'ASC' } });
  }
}
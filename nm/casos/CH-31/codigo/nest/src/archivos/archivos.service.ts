import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Archivo } from './entities/archivo.entity';

@Injectable()
export class ArchivosService {
  constructor(
    @InjectRepository(Archivo) private readonly archivos: Repository<Archivo>
  ) {}

  crearArchivo(nombre: string) {
    const archivo = this.archivos.create({ nombre });
    return this.archivos.save(archivo);
  }

  listarArchivos() {
    return this.archivos.find({ order: { id: 'ASC' } });
  }
}
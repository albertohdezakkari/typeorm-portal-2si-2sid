import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Editorial } from './entities/editorial.entity';

@Injectable()
export class EditorialesService {
  constructor(
    @InjectRepository(Editorial) private readonly editoriales: Repository<Editorial>
  ) {}

  crearEditorial(nombre: string) {
    const editorial = this.editoriales.create({ nombre });
    return this.editoriales.save(editorial);
  }

  listarEditoriales() {
    return this.editoriales.find({ order: { id: 'ASC' } });
  }
}
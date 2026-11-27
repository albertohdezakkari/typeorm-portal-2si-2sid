import { Body, Controller, Get, Post } from '@nestjs/common';
import { LocutoresService } from './locutores.service';

@Controller('locutores')
export class LocutoresController {
  constructor(private readonly service: LocutoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearLocutor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarLocutores();
  }
}

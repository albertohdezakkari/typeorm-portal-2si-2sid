import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActoresService } from './actores.service';

@Controller('actores')
export class ActoresController {
  constructor(private readonly service: ActoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearActor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarActores();
  }
}
